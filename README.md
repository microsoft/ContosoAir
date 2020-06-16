# This project is retired, archived, and no longer supported. You are welcome to continue to use and fork the repository.


# Microsoft.Github CI Demo

Demo website application for Contoso Air.  
Runs a nodejs server (Express v4.16) that stores customer booked flights in a CosmosDb database.

## Requirements

* Node v8.9.4 or later
* Azure CosmosDb

## Local Environment Setup

This project uses ES6, and has been tested with nodejs v8.9.4  
There is almost no front-end logic. Still, the application uses webpack to compile sass styles and bundle third parties js files. If you want to modify any front logic or style run `npm run local:build`.

In order to launch a local server on port 3000 (can be modified with environment variable PORT) run:

```bash
npm install
SET %COSMOS_DB_NAME%=<azure_web_site>
SET %COSMOS_DB_AUTH_KEY%=<cosmos_auth_key>
npm start
```

This will run locally the server and attach to the CosmosDb Endpoint using mongodb connection string.

## Azure Manual Deployment

In order to create the Azure deploy there is an ARM template located at deployment folder.

ARM template parameter | Usage | e.g.
--- | --- | ---
p_environment | set an environment suffix | `dev`
p_site_prefix | common prefix for all resources created | `contoso-air`
p_site_web_name | website specific resource name | `web`
p_comosdb_name | database specific resource name | `db`

> e.g. previous parameter examples will create resources `contoso-air-db-dev` and `contoso-air-db-dev`.

Then you run the ARM template with the following commands ([Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest) required): 

```bash
cd deployment
az group deployment create --resource-group <resource_group_name> --template-file azuredeploy.json --parameters p_environment=dev
```

What's left is to compress the whole folder in a zip file and upload it to Azure. Manually it can be done going to [https://<app_service_resource>.scm.azurewebsites.net/ZipDeployUI](https://docs.microsoft.com/en-us/azure/app-service/app-service-web-get-started-nodejs#deploy-zip-file)

> Note: Files under folders `deployment`, `scss` and files `front.js` and `webpack.config.js` are not required to be zipped.

## Azure DevOps Deployment

### Build process tasks
- [Copy Files](https://go.microsoft.com/fwlink/?LinkID=708389)
  - Source Folder: deployment
  - Contents: *.json
  - Target Folder: $(build.artifactstagingdirectory)/Templates
- [npm](https://go.microsoft.com/fwlink/?LinkID=613746)
  - Command: custom
  - Command and arguments: install --production
- [Archive Files](http://go.microsoft.com/fwlink/?LinkId=809083)
  - Root folder: $(System.DefaultWorkingDirectory)
  - Archive type: zip
- [Publish Artifact](https://go.microsoft.com/fwlink/?LinkID=708390)

### Release process tasks:
- [Azure Resource Group Deployment](https://aka.ms/argtaskreadme)
  - Template: select from the artifact in the Templates folder.
  - Template Parameters: same as previous parameter.
  - Override template parameters: At least modify the -p_environment variable.
- [Azure App Service Deploy](https://aka.ms/azurermwebdeployreadme)
  - Package or folder: Select zip cabinet from the artifact.

## Contributing

This project welcomes contributions and suggestions.  Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
