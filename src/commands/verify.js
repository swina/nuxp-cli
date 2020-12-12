const fs = require('fs')
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const execa = require('execa')
const constants = require('../config')

const repo_user = constants.repo_user//'https://github.com/swina/'
const repos = constants.repos

const homepath = path.resolve('.')
var current = 0

async function _verify(repo){
    
    try {
        if ( repo >= folders.length ) return
        process.chdir ( path.resolve( homepath , folders[repo] ) )
        console.log ( folders[repo] )
        
        let install = await exec( 'yarn check --verify-tree', (err,stdout,stderr) => { 
            if ( err ) return false
            current++
            process.chdir ( homepath )
            _verify(current)
        })
        
        install.stdout.on ( 'data' , data=> {
            //console.log ( process.cwd() , data.toString() )
        })

        
    } 
    catch ( err ) {
        console.log ( err )
    }   
}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
  }

var folders = getDirectories( homepath )
class VerifyCommand extends Command {
    async run() {
        console.clear()
        
        cli.action.start('Verify repos')
        _verify(current)
    }

}

VerifyCommand.description = `Clone NUXPRESSO for Strapi CMS and install dependencies`

VerifyCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = VerifyCommand