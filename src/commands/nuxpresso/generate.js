const fs = require ( 'fs-extra' )
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
const chalk = require ( 'chalk' )
const servers = [ 'http://localhost:1337/' , 'http://192.168.1.150:1337/']
const log = console.log 

const paths = {
    deployment: 'c:/nuxpresso-websites/',
    nuxpresso: 'c:/nuxpresso/nuxpresso-nuxt/'
}

//const strapi = require (  paths.deployment + 'config.js' )


const targets = fs.readdirSync ( path.resolve ( paths.deployment ) ).filter( (file) => {
    return !file.endsWith('js')
}) 
targets.push ( 'New' )
let target = null

class GenerateCommand extends Command {
    async run() {
        console.clear()
        const homepath = await process.cwd( path.resolve ( paths.nuxpresso ) ) 
        const source = await inquirer.prompt([{
            name: 'strapi',
            message: 'Select a Strapi source ',
            type: 'list',
            choices: servers,
            default: null
        }])
        
        if ( targets.length ){
            target = await inquirer.prompt([{
                name: 'folder',
                message: 'Select a website to generate ',
                type: 'list',
                choices: targets,
                default: null
            }])
        }
        if ( !targets.length || target.folder === 'New' ){
            target = await inquirer.prompt([{
                name: 'folder',
                message: 'Create a website folder',
                type: 'input',
                default: 'my website'
            }])
            process.cwd ( path.resolve ( paths.deployment ))
            log ( process.cwd())
            const new_website = await exec ( 'mkdir ' + target.folder )
            log ( 'Created new website deployment folder ')
            log ( chalk.blue(target.folder) )
        }
        if ( source.strapi ){
            const configString = 'const strapi={ url : "' + source.strapi + '" , dist : "' + paths.deployment + target.folder + '/dist" }\nmodule.exports = strapi'
            const writeConfig = await fs.writeFileSync ( paths.deployment + 'config.js' , configString )
            log ( chalk.green('Configuration saved.') )
        }
        process.chdir ( paths.nuxpresso )
        process.cwd()
        const generated = await exec ( 'yarn generate'  , ( err , stdout , stderr ) =>{
            if ( err ) log ( chalk.red(err) )
        })
        generated.stdout.on ( 'data' , data=> {
            log ( data.toString() )
        })
        await generated.on ( 'close' , data=> {
            /*
            fs.copy( paths.nuxpresso + 'dist' , paths.deployment + target.folder + '/dist')
            .then(() => {
                console.log('Website ready to deployment')
            })
            .catch(err => {
                console.error(err)
            })
            */
            console.log ( chalk.green('Completed. Checkout at http://localhost:3000' ) )
             
        })
        
    }
}

GenerateCommand.description = `Generate a NUXPRESSO website`

GenerateCommand.flags = {
    help: flags.help({char: 'h'}),
}


module.exports = GenerateCommand
