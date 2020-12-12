const fs = require ( 'fs' )
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
const { writeFile } = require('fs')


class MokaCommand extends Command {
    async run() {
      const {flags} = this.parse(MokaCommand)
      const name = flags.name || 'nuxpresso'
      if  ( flags.version ) {  return }
      console.clear()
      let responses  = await inquirer.prompt([{
        name: 'install',
        message: 'Do you want to configure nuxpresso-moka?',
        type: 'confirm'}])
    }
  }
  
  MokaCommand.description = `Configure MOKAStudio environment`
  
  MokaCommand.flags = {
    // add --version flag to show CLI version
    version: flags.version({char: 'v'}),
    // add --help flag to show CLI version
    help: flags.help({char: 'h'}),
    name: flags.string({char: 'n', description: 'name to print'})
   
  }
  
  module.exports = MokaCommand