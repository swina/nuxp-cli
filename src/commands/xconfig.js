const fs = require ( 'fs' )
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
const { writeFile } = require('fs')
var configuration_strapi = [
    { name: "HOST", label: 'Strapi HOST IP' , type: 'input' , default: '0.0.0.0' },
    { name: "PORT", label: 'Strapi HOST PORT' , type: 'input' , default: "1338" },
    { name: "DATABASE_CLIENT", label: 'DATABASE Type' , type: 'list' , default: ["postgres","mysql","sqlite","mongo"] },
    { name: "DATABASE_HOST" , label: 'DATABASE Host' , type: 'input' , default: '127.0.0.1' },
    { name: "DATABASE_PORT" , label: 'DATABASE Port' , type: 'input' , default: '5435' },
    { name: "DATABASE_NAME" , label: 'DATABASE Name' , type: 'input' ,default : "nuxpresso-strapi" },
    { name: "DATABASE_USERNAME" , label: 'DATABASE Username' , type: 'input' , default: '' },
    { name: "DATABASE_PASSWORD" , label: 'DATABASE Password' , type: 'password' , default: '' },
    { name: "DATABASE_SSL" , label: 'DATABASE SSL' , type: 'confirm' , default: false },
    { name: "CLOUDINARY_API_KEY" , label: 'Cloudinary API KEY' , type: 'input' , default: '' },
    { name: "CLOUDINARY_API_SECRET" , label: 'Cloudinary API SECRET' , type: 'input' , default: '' },
    { name: "CLOUDINARY_CLOUD_NAME" , label: 'Cloudinary Cloud Name' , type: 'input' , default: '' },
    { name: "MAILGUN_API_KEY" , label: 'Mailgun API KEY' , type: 'input' , default: '' },
    { name: "MAILGUN_DOMAIN" , label: 'Mailgun Domain' , type: 'input' , default: '' },
    { name: "MAILGUN_FROM" , label: 'Mailgun Email From' , type: 'input' , default: '' },
    { name: "MAILGUN_REPLYTO" , label: 'Mailgun Reply To' , type: 'input' , default: '' },
    { name: "SITE_EMAIL" , label: 'SITE Email' , type: 'input' , default: '' }
]
var current = 0
var questions = Object.keys(configuration_strapi)
var configuration = []

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
        message: 'Confirm configuration nuxpresso-strapi?',
        type: 'list' ,
        choices: [ 'Confirm' , 'Restart' , 'Quit' ]
    }])
    if ( confirmation.confirm === 'Confirm' ){
        cli.action.start ( 'Writing to env.strapi')
        fs.writeFile('env.strapi', str , function (err,data) {
            if (err) {
                return console.log(err);
            }
        });
        cli.action.stop ( 'Rename the file to env and copy in the root folder of nuxpresso-strapi' )
    } 
    if ( confirmation.confirm === 'Restart' ){
        console.clear()
        console.log ( 'nuxpresso-strapi environment configuration')
        current = 0
        question(current)
    }
    return 
}

class ConfigCommand extends Command {
    async run() {
      const {flags} = this.parse(ConfigCommand)
      const name = flags.name || 'nuxpresso'
      if  ( flags.version ) {  return }
      console.clear()
      let responses  = await inquirer.prompt([{
        name: 'install',
        message: 'Do you want to configure nuxpresso-strapi?',
        type: 'confirm'}])
      if ( responses.install ){
          question(current)
      }
    }
  }
  
  ConfigCommand.description = `Install NUXPRESSO for Strapi CMS`
  
  ConfigCommand.flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    // add --help flag to show CLI version
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'name to print'})
   
  }
  
  module.exports = ConfigCommand