const fs = require('fs')
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
const { environments } = require ( '../../constants')
const chalk = require ( 'chalk' )
var folders = [
    { target: '/dev/nuxpresso/nuxpresso-strapi' , cmd: 'yarn develop' },
    { target: '/dev/nuxpresso/nuxpresso-moka-studio' , cmd : 'yarn serve' },
    { target: '/Users/PC/Downloads/nuxpresso/nuxpresso-nuxt' , cmd: 'yarn dev' },
]

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
}
var current = 0
async function runNuxpresso(){
    if ( current >= folders.length ) return 
    let prog = folders[current].target 
    process.chdir ( folders[current].target )
    process.cwd()
    const devs = await exec ( folders[current].cmd , ( err , stdout , stderr ) =>{
        if ( err ) console.log ( err )
    })
    devs.stdout.on ( 'data' , data=> {
        console.log ( prog )
        console.log ( data.toString() )
    })

    current++
    runNuxpresso()
}
//main
class DevCommand extends Command {
    async run() {
        console.clear()
        const {flags} = this.parse(DevCommand)
        const apps = Object.keys ( environments )
        let response = await inquirer.prompt ([
            {
                name: 'app',
                message: 'What do you want to run?',
                type: 'list',
                choices: apps,
                default: apps[1]
            }
        ])
        console.log ( response.app )
        const runCmd = environments[response.app].cmd
        console.log ( runCmd )
        if  ( response.app ){
            process.chdir ( environments[response.app].folder )
            console.log ( process.cwd( ) )
            const runApp = await exec ( runCmd  , ( err,stdout,stderr) =>{
                if ( err ) return err
            })

            runApp.stdout.on ( 'data' , data=> {
                console.log ( chalk.green ( data.toString() ) )
            })
        }
        /*
        let response  = await inquirer.prompt([
            {
                name: 'run',
                message: 'Do you want to run nuxpresso',
                type: 'confirm'
            },
           
        ])
        if ( response.run ){
            runNuxpresso()
        }*/
    }

}

DevCommand.description = `Clone NUXPRESSO for Strapi CMS repos and install dependencies`

DevCommand.flags = {
    help: flags.help({char: 'h'}),
}


module.exports = DevCommand
