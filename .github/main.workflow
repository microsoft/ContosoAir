workflow "New workflow" {
  on = "push"
  resolves = ["Deploy Webapp"]
}

action "Deploy Webapp" {
  uses = "actions/azure@master"
  args = "webapp create --resource-group $RESOURCE_GROUP --plan $APP_SERVICE_PLAN --name $WEBAPP_NAME"
  secrets = [
    "AZURE_SERVICE_TENANT",
    "AZURE_SERVICE_APP_ID",
    "AZURE_SERVICE_PASSWORD",
  ]
  env = {
    APP_SERVICE_PLAN = "myAppServicePlan"
    RESOURCE_GROUP = "myLinuxResourceGroup"
    WEBAPP_NAME = "myWebApp"
  }
}
