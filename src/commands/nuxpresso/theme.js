const fs = require ( 'fs-extra' )
const path = require( 'path' )
const { exec } = require( 'child_process' )
const {Command, flags} = require( '@oclif/command' )
const {cli} = require( 'cli-ux' )
const inquirer = require( 'inquirer' )
//const { zipIt } = require ( '../../zip' )
//const archiver = require('node-archiver')
const zipper = require('zip-local')
const jp = require('jsonpath')

const paths = {
    nuxpresso: '/nuxpresso',
    strapi: '/nuxpresso/nuxpresso-strapi-website/public'
}

const themes = fs.readdirSync ( path.resolve ( process.cwd() ) ).filter ( file => {
    return file.endsWith('json')
})

var blocks = []

async function image_data_uri(file){

    const data_uri = await fs.readFile(file).then ( data => data )
    const uri_string = await new Promise ( resolve => {
        
        
        //get image file extension name
        let extensionName = path.extname(file);
        
        //convert image file to base64-encoded string
        let base64Image = new Buffer(data_uri, 'binary').toString('base64');
        
        //combine all strings
        let imgSrcString = `data:image/${extensionName.split('.').pop()};base64,${base64Image}`;
        return imgSrcString
    })
    return uri_string

}

async function runNuxpressoTheme(){
    const homepath = await process.cwd() 
    blocks = []
    let theme 
    if ( themes ){
        theme = await inquirer.prompt([{
            name: 'json',
            message: 'Select a theme to create',
            type: 'list',
            choices: themes,
            default: themes[0]
        }])
        //theme.json = path.resolve(process.cwd() , theme.json )
        console.log ( theme.json )
    } else {
        theme = await inquirer.prompt([{
            name: 'json',
            message: 'Enter the json file path',
            type: 'input',
            default: '/nuxpresso/test/moka.export.json'
        }])
    }
    let strapi = await inquirer.prompt([{
        name: 'source',
        message: 'Strapi public folder path',
        type: 'input',
        default: '/nuxpresso/nuxpresso-strapi/public'
    }])
    let destination = await inquirer.prompt([{
        name: 'folder',
        message: 'Theme name',
        type: 'input',
        default: 'theme'
    }])
    let response  = await inquirer.prompt([
        {
            name: 'run',
            message: 'Create a Theme in ' + destination.folder ,
            type: 'confirm'
        },
       
    ])
    if ( response.run ){
        try {
            //await exec ( 'mkdir' + destination.folder )
            let randomID = 'NXP-' + Math.random().toString(36).substr(2, 4)
            blocks = []
            await fs.mkdirpSync ( destination.folder )
            await process.chdir ( process.cwd() + '/' + destination.folder )
            const data = fs.readFileSync(homepath + '/' + theme.json, 'utf8')
            let json = JSON.parse(data)
            let source = theme.json.split('/')
            let entries = json.map ( entry => {
                return entry.name
            })
            let featured_image = await inquirer.prompt([{
                name: 'featured',
                message: 'Which block you want to use as theme featured image',
                type: 'list',
                choices: entries,
                default: entries[0]
            }])
            await json.forEach ( (entry,index) => {
                delete json.autosave
                //json[index].name = json[index].name.replace('')
                if ( entry.name === featured_image.featured ){
                    console.log ( 'featured is=>' , entry.name )
                    json[index].favorite = true
                }
                let images = jp.query( entry.json , '$.blocks..image' )
                images.forEach ( image => {
                    console.log ( image )
                    if ( image ){
                        console.log ( image.url )
                        if ( image.url && !image.url.includes('http') ){
                            if ( fs.existsSync ( strapi.source + image.url ) ){
                                fs.copySync ( strapi.source + image.url ,  homepath + '/' + destination.folder + '/' +  image.url.replace('uploads/','') )
                            }
                        }
                    }
                })
                
            })
            const updatedFile = await fs.writeFileSync(homepath + '/' + theme.json , JSON.stringify(json) )
            await fs.copySync ( homepath + '/' + theme.json , homepath + '/' + destination.folder + '/' + source[source.length-1] )
            await json.forEach ( block => {
                console.log ( block.category , '-' , block.name , block.favorite )
                if ( block.image_uri && !block.image_uri.includes('http') ){
                    let name = block.image_uri.split('/')
                    name = name[name.length-1]
                    if ( fs.existsSync ( strapi.source + block.image_uri ) ){
                        fs.copySync ( strapi.source + block.image_uri ,  homepath + '/' + destination.folder + '/' +  name )
                        blocks.push ( name )
                    }
                }
            })
            zipper.sync.zip(homepath+'/'+destination.folder).compress().save(homepath + '/' + destination.folder + '.zip' )
            console.log ( 'Theme created successfully!')
        } catch (err) {
            console.error(err)
        }
    }
    
}
//main
class ThemeCommand extends Command {
    async run() {
        console.clear()
        const {flags} = this.parse(ThemeCommand)
        let response  = await inquirer.prompt([
            {
                name: 'run',
                message: 'Create a Nuxpresso Theme',
                type: 'confirm'
            },
           
        ])
        if ( response.run ){
            runNuxpressoTheme()
        }
    }

}

ThemeCommand.description = `Clone NUXPRESSO for Strapi CMS repos and install dependencies`

ThemeCommand.flags = {
    help: flags.help({char: 'h'}),
    source: flags.string({char: 'n', description: 'nuxpresso json file path'})
}

module.exports = ThemeCommand