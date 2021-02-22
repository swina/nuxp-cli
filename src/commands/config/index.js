const fs = require ( 'fs' )
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
const { writeFile } = require('fs')
const constants = require('../../constants')

const configuration_strapi = constants.configuration_strapi

var current = 0
var questions = Object.keys(configuration_strapi)
var configuration = []
var port = '1337'
async function question(){
    if ( current >= questions.length ) { 
        return writeConfig()
    }
    let quest = questions[current]
    configuration[current] = await inquirer.prompt([{
        name: configuration_strapi[current].name,
        message: configuration_strapi[current].label,
        type: configuration_strapi[current].type,
        choices: configuration_strapi[current].type === 'list' ? configuration_strapi[current].default : null,
        default: configuration_strapi[current].default
    }])
    current++
    question()
}

function writeConfig(){
    console.clear()
    let str = ''
    configuration.forEach ( (q,index) => {
        if ( Object.keys(q) === 'PORT' ){
            port = Object.values(q).join('')
        }
        str += Object.keys ( q ) + '=' + Object.values(q).join('') + '\n'
    })
    console.log ( 'Your configuration ')
    console.log ( str )
    confirmConfig(str)
    return 
}

async function confirmConfig (str){
    let confirmation = await inquirer.prompt([{
        name: 'confirm',
        message: 'Confirm configuration?',
        type: 'list' ,
        choices: [ 'Confirm' , 'Restart' , 'Quit' ]
    }])
    if ( confirmation.confirm === 'Confirm' ){
        cli.action.start ( 'Writing configuration')
        fs.writeFile('nuxpresso-strapi/.env', str , function (err,data) {
            if (err) {
                return console.log(err);
            }
        });
        var nuxt = 'API_URL=http://localhost:' + port + '/\n'

        fs.writeFile('nuxpresso-nuxt/.env' , nuxt  , function (err,data) {
            if (err) {
                return console.log(err);
            }
        });
        var moka = 'VUE_APP_API_URL=http://localhost:' + port + '/\n'
        moka += 'VUE_APP_GRAPHQL=http://localhost:'+ port + '/graphql\n'
        fs.writeFile('nuxpresso-moka/.env', moka , function (err,data) {
            if (err) {
                return console.log(err);
            }
        });
        
        cli.action.stop ( 'Configuration files created' )
    } 
    if ( confirmation.confirm === 'Restart' ){
        console.clear()
        console.log ( 'nuxpresso environment configuration')
        current = 0
        question(current)
    }
    return 
}

class ConfigCommand extends Command {
    async run() {
      console.clear()
      let responses  = await inquirer.prompt([{
        name: 'install',
        message: 'Do you want to configure nuxpresso (existing configuration will be overwritten)?',
        type: 'confirm'}])
      if ( responses.install ){
          question(current)
      }
    }
}
  
ConfigCommand.description = `NUXPRESSO for Strapi CMS configuration`

ConfigCommand.flags = {
    help: flags.help({char: 'h'}),
}

module.exports = ConfigCommand