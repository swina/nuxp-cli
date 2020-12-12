const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const Listr = require( 'listr' )
const inquirer = require( 'inquirer' )
const execa = require ( 'execa' )
var cwd = require ( 'cwd' )
const repo_user = 'https://github.com/swina/'
const repos = [ 
  //{ name:'nuxpresso nuxt', origin: 'nuxpresso-nuxt' , target: 'nuxpresso-nuxt' } , 
  { name:'nuxpresso moka studio' , origin: 'nuxpresso-moka' , target : 'nuxpresso-moka' } ,
  { name:'nuxpresso strapi', origin: 'nuxpresso-strapi' , target: 'nuxpresso-strapi' } , 
]

async function clone(index){
    if ( index >= repos.length ) return 
    let repo = repos[index]
    cli.action.start('Cloning repo ' + repo.name)
    await  exec ( 'git clone ' + repo_user + repo.origin , (err,stdout,stderr) => {
        if ( err ) return false 
        cli.action.stop('Repo cloned')
        cli.action.start('Install dependencies for ' + repo.name )
        process.chdir ( currentTarget ( repo.origin ) )
        _install ( repo )

    })
}

async function _install(repo){
    
        try {
            let install = await exec('yarn --cwd "' + repo + '" --force', (err,stdout,stderr) => { 
                if ( err ) return false
                cli.action.stop('Dependencies installed')
                current++
                process.chdir ( homepath )
                clone(current)
            })

            install.stdout.on ( 'data' , data=> {
                console.log ( data.toString() )
            })

            
        } 
        catch ( err ) {
            console.log ( err )
        }   
}

homepath = path.resolve('.')
current = 0
target = path.resolve( homepath, repos[current].target )
function currentTarget(repo){
    return path.resolve(homepath,repo).replace('C:','').replace('D:','').split('\\').join('/')
}
/*
const tasks = new Listr([
        
                {
                    title: 'Clone nuxpresso-nuxt',
                    task: ( ctx,task ) => clone ( repos[0] ).then ( result => {
                        console.log ( 'nuxpresso-nuxt ' )
                    })
                },
                {
                    title: 'Clone nuxpresso-moka',
                    task: ( ctx,task ) => clone ( repos[1] ).then ( result => {
                        console.log ( 'nuxpresso-moka ' )
                    })
                },
                {
                    title: 'Clone nuxpresso-strapi', 
                    task: ( ctx,task ) => clone ( repos[2] ).then ( result => {
                        console.log ( 'nuxpresso-strapi ' )
                    })
                },
            ], { concurrent: false })
       
    
    {
        title: 'Install dependencies',
        //enabled: ctx => ctx.nuxt === true ,
        task: ( ctx , task ) => {
            process.chdir( currentTarget( repos[0].target ) )
            console.log ( process.cwd() )
            let cmd = 'yarn --force' // --cwd "' + curdir + '" --force'
            execa( cmd )
                .stdout.pipe(process.stdout)
        }
    }
    */

class NewCommand extends Command {
    async run() {
        console.clear()
        let response  = await inquirer.prompt([{
            name: 'install',
            message: 'Do you want to install nuxpresso?',
            type: 'confirm'
        }])
        if ( response.install ){
            clone(current)
            //tasks.run().catch(err => {
            //    console.error(err);
            //});
        }
    }

}

NewCommand.description = `Clone NUXPRESSO for Strapi CMS and install dependencies`

NewCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = NewCommand