workflow "New workflow" {
  on = "push"
  resolves = ["Deploying Web App"]
}

action "GitHub Action for Azure" {
  uses = "Azure/github-actions/cli@7e91de5a41b40f2db181215fbbeaf6a2155b9f38"
  args = "zip -r WebApp.zip ."
}

action "Create Webapp" {
  uses = "actions/azure@master"
  needs = "GitHub Action for Azure"
  args = "webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name $WEBAPP_NAME"
  secrets = [
    "AZURE_SERVICE_PASSWORD",
    "AZURE_SERVICE_TENANT",
    "AZURE_SERVICE_APP_ID",
  ]
  env = {
    APP_SERVICE_PLAN = "ServicePlan6f5a4cc4-8851"
    RESOURCE_GROUP = "sachinsample"
    WEBAPP_NAME = "myWebAppsachin0215"
  }
}

action "Deploying Web App" {
  uses = "Azure/github-actions/cli@7e91de5a41b40f2db181215fbbeaf6a2155b9f38"
  needs = ["Create Webapp"]
  args = "az webapp deployment source config-zip -g $RESOURCE_GROUP -n $WEBAPP_NAME   --src ./WebApp.zip"
  env = {
    APP_SERVICE_PLAN = "ServicePlan6f5a4cc4-8851"
    RESOURCE_GROUP = "sachinsample"
    WEBAPP_NAME = "myWebAppsachin0215"
  }
}
