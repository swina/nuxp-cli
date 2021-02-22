module.exports = {
    repo_user : 'https://github.com/swina/',
    repos : [ 
        { name:'nuxpresso nuxt', origin: 'nuxpresso-nuxt' , target: 'nuxpresso-nuxt' } , 
        { name:'nuxpresso moka studio' , origin: 'nuxpresso-moka' , target : 'nuxpresso-moka' } ,
        { name:'nuxpresso strapi', origin: 'nuxpresso-strapi' , target: 'nuxpresso-strapi' }  
    ],
    
    configuration_strapi : [
        { name: "HOST", label: 'Strapi HOST IP' , type: 'input' , default: '0.0.0.0' },
        { name: "PORT", label: 'Strapi HOST PORT' , type: 'input' , default: "1338" },
        { name: "DEV_USER" , label: 'Strapi Admin username' , type: 'input' , default: 'admin'},
        { name: "DEV_PASS" , label: 'Strapi Admin password' , type: 'password' , default: ''},
        { name: "DEV_EMAIL" , label: 'Strapi Admin Email' , type: 'input' , default: 'admin@test.test'},
        { name: "DATABASE_CLIENT", label: 'DATABASE Type' , type: 'list' , default: ["postgres","mysql","sqlite","mongo"] },
        { name: "DATABASE_HOST" , label: 'DATABASE Host' , type: 'input' , default: '127.0.0.1' },
        { name: "DATABASE_PORT" , label: 'DATABASE Port' , type: 'input' , default: '5435' },
        { name: "DATABASE_NAME" , label: 'DATABASE Name' , type: 'input' ,default : "nuxpresso-strapi" },
        { name: "DATABASE_USERNAME" , label: 'DATABASE Username' , type: 'input' , default: '' },
        { name: "DATABASE_PASSWORD" , label: 'DATABASE Password' , type: 'password' , default: '' },
        { name: "DATABASE_SSL" , label: 'DATABASE SSL' , type: 'confirm' , default: false },
        { name: "CLOUDINARY_ENABLED" , label: 'Using Cloudinary or Local as media provider?' , type: 'list' , default: ["Cloudinary","Local"] },
        { name: "CLOUDINARY_API_KEY" , label: 'Cloudinary API KEY' , type: 'input' , default: '' },
        { name: "CLOUDINARY_API_SECRET" , label: 'Cloudinary API SECRET' , type: 'input' , default: '' },
        { name: "CLOUDINARY_CLOUD_NAME" , label: 'Cloudinary Cloud Name' , type: 'input' , default: '' },
        { name: "MAILGUN_ENABLED" , label: 'Using Mailgun as email provider?' , type: 'confirm' , default: true },
        { name: "MAILGUN_API_KEY" , label: 'Mailgun API KEY' , type: 'input' , default: '' },
        { name: "MAILGUN_DOMAIN" , label: 'Mailgun Domain' , type: 'input' , default: '' },
        { name: "MAILGUN_FROM" , label: 'Mailgun Email From' , type: 'input' , default: '' },
        { name: "MAILGUN_REPLYTO" , label: 'Mailgun Reply To' , type: 'input' , default: '' },
        { name: "SITE_EMAIL" , label: 'SITE Email' , type: 'input' , default: '' }
    ],
    environments : {
        mokastudio: { folder: "c:/nuxpresso/nuxpresso-moka/" , cmd: 'yarn serve' },
        nuxpresso: { folder : "c:/nuxpresso/nuxpresso-nuxt/" , cmd: 'yarn start' },
        strapi: { folder: "c:/nuxpresso/nuxpresso-strapi/" , cmd: 'yarn develop' }
    }

}
