const fs = require('fs')
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const execa = require('execa')
const constants = require('../../constants')

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
            console.log (  data.toString() )
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
        const {flags} = this.parse(VerifyCommand)
        cli.action.start('Verify repos')
        _verify(current)
    }

}

VerifyCommand.description = `Verifies that versions of the package dependencies`

VerifyCommand.flags = {
    help: flags.help({char: 'h'}),
}

module.exports = VerifyCommand