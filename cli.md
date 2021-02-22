# nuxp-cli

## Using the CLI

To facilitate the process of running a working development environment I created a CLI to:

- install the repos required
- set the configuration for the apps required
- run the development environment based on the configuration set during the installation



### Install the CLI

```
npm install -g nuxp-cli 
```

### Install Nuxpresso

```
mkdir nuxpresso
cd nuxpresso
nuxp-cli nuxpresso:new
```

This will install all the repos required with the following structure from your nuxpresso folder.

```
|--nuxpresso-moka
|--nuxpresso-nuxt
|--nuxpresso-strapi
```

**nuxpresso-moka** : MOKAStudio 

**nuxpresso-nuxt** : nuxpresso site generator based on NUXTJS

**nuxpresso-strapi** : Strapi CMS starter to work with nuxpresso


## Configure nuxpresso installation

Run the following command

```
nuxp-cli config
```
A new terminal screen will be initiated

```
? Do you want to configure nuxpresso (existing configuration will be overwritten)? Yes
? Strapi HOST IP 0.0.0.0
? Strapi HOST PORT 1338
? Strapi Admin username admin
? Strapi Admin password [hidden]
? Strapi Admin Email admin@test.test
? DATABASE Type postgres
? DATABASE Host 127.0.0.1
? DATABASE Port 5435
? DATABASE Name nuxpresso-strapi
? DATABASE Username
? DATABASE Password [hidden]
? DATABASE SSL No
? Cloudinary API KEY (leave blank if not used)
? Cloudinary API SECRET  (leave blank if not used)
? Cloudinary Cloud Name  (leave blank if not used)
? Mailgun API KEY  (leave blank if not used)
? Mailgun Domain  (leave blank if not used)
? Mailgun Email From  (leave blank if not used)
? Mailgun Reply To  (leave blank if not used)
? SITE Email ()


? Confirm configuration? (Use arrow keys)
> Confirm
  Restart
  Quit                                                                                                                                                                                
```

When confirmed the CLI will automatically create the env configuration files for all the apps.

## Strapi CMS configuration notes

nuxpresso-strapi is configured to run using local resources for upload and email.

By the way nuxpresso will install the following dependencies for:

- [Cloudinary](https://cloudinary.com) as media provider ( strapi-provider-upload-cloudinary )
- [Mailgun](https://mailgun.com) as email provider ( strapi-provider-email-mailgun )

If you don't plan to use external media and email providers you can remove them.

```
/nuxpresso $ cd nuxpresso-strapi
yarn remove strapi-provider-upload-cloudinary strapi-provider-email-mailgun
```

### Using external providers

If you plan to use external providers like Cloudinary and Mailgun you need to update the ```config/plugin.js``` file as follow.

```
module.exports = ({env})=>({
    //GraphQL is required and installed by default: do not remove
    graphql: {
      endpoint: '/graphql',
      tracing: false,
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
    },

    //Cloudinary media provider
    upload: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env('CLOUDINARY_CLOUD_NAME'),
        api_key: env('CLOUDINARY_API_KEY'),
        api_secret: env('CLOUDINARY_API_SECRET')
      }
    },
    //Mailgun media provider
    email: {
      provider: 'mailgun',
      providerOptions: {
        apiKey: env('MAILGUN_API_KEY'),
        domain: env('MAILGUN_DOMAIN')
      },
      settings: {
        defaultFrom: env('MAILGUN_FROM'),
        defaultReplyTo: env('MAILGUN_REPLYTO')
      },
    },

})
```

If you are using different providers you have to install the relative dependencies needed and update the ```config/plugins.js``` depending on the provider you are using and update the relative environment variables. 

Please refer to the official [Strapi CMS documentation](https://strapi.io/documentation/) on how to configure you providers.


## Build Strapi admin

After the configuration you need to run the Strapi CMS build in order to set it working. This will also create the admin user defined in the config process. Be sure to move to the nuxpresso-strapi installation folder.

```
cd nuxpresso-strapi
yarn build
```



## Run the development environment

When the Strapi build process is completed you can run the nuxpresso development environment using the following CLI command

```
nuxp-cli nuxpresso:dev
```

As for the configuraiton procedure you will have


As per default configuration you will have: 
 - Strapi CMS running (http://localhost:1337 by default)
 - NUXPRESSO (http://localhost:3000)
 - MOKAStudio (http://localhost:8080)


Alternatively you can run each app indipendently


**The GraphQL configuration is required in order to make NUXPRESSO working correctly**

```
// config/plugins.js

module.exports = ({env})=>({
    //GraphQL is required and installed by default: do not remove
    graphql: {
      endpoint: '/graphql',
      tracing: false,
      shadowCRUD: true,
      playgroundAlways: true,
      depthLimit: 7,
      amountLimit: 100,
    },

    //Cloudinary media provider
    upload: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env('CLOUDINARY_CLOUD_NAME'),
        api_key: env('CLOUDINARY_API_KEY'),
        api_secret: env('CLOUDINARY_API_SECRET')
      }
    },
    //Mailgun media provider
    email: {
      provider: 'mailgun',
      providerOptions: {
        apiKey: env('MAILGUN_API_KEY'),
        domain: env('MAILGUN_DOMAIN')
      },
      settings: {
        defaultFrom: env('MAILGUN_FROM'),
        defaultReplyTo: env('MAILGUN_REPLYTO')
      },
    },

})
```

If you are using different providers you have to install the relative dependencies needed and update the ```config/plugins.js``` depending on the provider you are using and update the relative environment variables. 

Please refer to the official [Strapi CMS documentation](https://strapi.io/documentation/) on how to configure you providers.