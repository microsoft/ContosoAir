workflow "New workflow" {
  on = "push"
  resolves = ["Deploy Webapp"]
}

action "Deploy Webapp" {
  uses = "actions/azure@master"
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
