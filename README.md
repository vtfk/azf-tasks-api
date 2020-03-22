# Visma Tasks API
Azure functions API that collects a users tasks from Visma HRM.

## Example:

User authenticates using Microsoft Graph and the onPremisesSamAccountName is gathered from there.

#### POST /api/tasks
Authentication: Bearer \<Microsoft Graph API token>

#### Result: 
```json
{
  "user": {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users(id,userPrincipalName,onPremisesSamAccountName,displayName)/$entity",
      "id": "7f4ec5f4-f0d5-400a-bc5e-50cfaccd7113",
      "userPrincipalName": "mats.andreassen@vtfk.no",
      "onPremisesSamAccountName": "matsa",
      "displayName": "Mats Andreassen"
    },
    "tasks": [
      {
        "systemid": "visma",
        "title": "Timelister til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/TIMESHEET",
        "number": "1",
        "timestamp": 1584696760516
      },
      {
        "systemid": "visma",
        "title": "Personalmeldinger til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/PERSONAL_FORMS_PROCESS",
        "number": "1",
        "timestamp": 1584696760516
      }
    ]
```

## Development

- Clone the repo
- Install the dependencies: ```$ npm i```
- Add local settings file
- Start the development server: ```$ func start```

### Local settings
*.local.settigs.json* file:
```json
{ 
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "{AzureWebJobsStorage}",
    "GRAPH_ME_ENDPOINT": "https://graph.microsoft.com/v1.0/me",
    "GRAPH_ORG_ENDPOINT": "https://graph.microsoft.com/v1.0/organization",
    "GRAPH_TENANT_ID": "08f3813c-9f29-482f-9aec-16ef7cbf477a",
    "VISMA_URL": "http://vismaserver/hrm_ws/secure/tasks/username/",
    "VISMA_USERNAME": "tasks-ws",
    "VISMA_PASSWORD": "Passw0rd",
    "CACHE": "true"
  }
}
```

## Deploy Azure functions

- Create an Azure function to deploy to.
- Deploy to Azure: ```$ func azure functionapp publish <function name>```


## License

[MIT](LICENSE)