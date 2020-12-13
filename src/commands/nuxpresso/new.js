const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
const constants = require('../../constants')

const repo_user = constants.repo_user //'https://github.com/swina/'
const repos = constants.repos 
var homepath = path.resolve('.')
var current = 0
var target = path.resolve( homepath, repos[current].target )
var pckg = 'yarn'

//return the target path (for windows replace disk C: or D:)
function currentTarget(repo){
    return path.resolve(homepath,repo).replace('C:','').replace('D:','').split('\\').join('/')
}

//clone repo
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

//install dependencies
async function _install(repo){
    
        try {
            //let install = await exec( pckg ' --cwd "' + repo + '" --force', (err,stdout,stderr) => { 
            let install = await exec( pckg  + ' --force install', (err,stdout,stderr) => {     
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


//main
class NewCommand extends Command {
    async run() {
        console.clear()
        const {flags} = this.parse(NewCommand)
        const name = flags.name || ''

        let response  = await inquirer.prompt([
            {
                name: 'install',
                message: 'Do you want to install nuxpresso in ' + homepath,
                type: 'confirm'
            },
           
        ])
        if ( response.install ){
            response = await inquirer.prompt([
                {
                    name: 'pkgmanager',
                    message: 'Which package manager you want to use?',
                    type: 'list',
                    choices: [ 'yarn' , 'npm' ],
                    default: 'yarn'
                }
            ])

            
            if ( name ) {
                await exec ( 'mkdir ' + name )
                await process.chdir ( currentTarget ( name) )
                homepath = process.cwd()
            }
            pckg = response.pkgmanager
            clone(current)
        }
    }

}

NewCommand.description = `Clone NUXPRESSO for Strapi CMS repos and install dependencies`

NewCommand.flags = {
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'destination folder'}),
}


module.exports = NewCommand