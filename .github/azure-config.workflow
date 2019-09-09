name: Greet Everyone
# This workflow is triggered on pushes to the repository.
on:
  push:
    paths:
      - 'deployment/*'

runs-on: ubuntu-18.04

jobs:
  build:
    # Job name is Greeting
    name: Greeting
    # This job runs on Linux
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v1
      - uses: azure/actions/login@master
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
    - run: |
        az webapp list --query "[?state=='Running']"
