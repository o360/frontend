# Open360 config guide

### Environment Configuration

To set up all necessary variables config file should be provided.
Example config file can be found at [/src/deploy-configs/example.json](/src/deploy-configs/example.json)

While running the project locally (without `--prod` flag) the `/tools/env/env.config.ts` configuration will be used to set up `LOCAL` environment.
In case of production build and run the system will be looking for configuration file at `/assets/config.json`.

The configuration file has the following properties:

| Field     | Description |
| :----------- | :---------- |
| `API` | API address |
| `ENV` | Environment name |
| `PROVIDERS` | Configurations for social auth providers |
| `DEFAULT_LANG` | Language code for translations to be used by default |
| `TITLE_MAIN` | Main title of website |
| `TITLE_NAV` | Title of website in shown in navbar |
| `AGREEMENTS` | Path to agreements .md files |

#### Social login
To configure login via social providers the following object need to be provided in the config file in `providers` field:
```
'<provider_name>': {
      authorizationUrlBase: '<provider_auth_url>',
      getParams: {
        client_id: '<client_id>',
        // other params required by the provider
      }
    }
```

Make sure Backend project of the system configured with the same providers options.
For more info visit [Backend authentication configuration](https://github.com/o360/backend#setting-up-authentication-sources) section.

Currently available providers: "FACEBOOK", "GOOGLE", "VK".
For required params follow the links:  
Facebook: https://developers.facebook.com/docs/facebook-login/manually-build-a-login-flow/  
VK: https://vk.com/dev/auth_sites  
Google: https://developers.google.com/identity/protocols/OAuth2WebServer  

To correctly set up user the following scopes should be requested from providers:  
Facebook: `scope: "email,user_gender""`  
VK: `scope: "email"`  
Google: `scope: "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email"`  
