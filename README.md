# Tasks API
Azure functions API that collects a users tasks from our different applications. Used to presents the tasks to the user on the intranet.

## Endpoints:


### GET /me
Returns a list of my tasks. User authenticates using Microsoft Graph and the onPremisesSamAccountName is gathered from there.
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
  "visma": {
    "tasks": [
      {
        "systemid": "hrm",
        "title": "Timelister til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/TIMESHEET",
        "number": "1",
        "timestamp": 1584696760516
      },
      {
        "systemid": "hrm",
        "title": "Personalmeldinger til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/PERSONAL_FORMS_PROCESS",
        "number": "1",
        "timestamp": 1584696760516
      }
    ],
    "count": 2
  },
  "public360": {
    "tasks": [],
    "count": 0
  },
  "planner": {
    "tasks": [
      {
        "id": "ASvb451-245sngjlOJOGOB",
        "planId": "NSFUt_TPKEamkSI77zXq4pcARRUb",
        "bucketId": "Z17wGuAsFEGPdiebiv6cnJcAFoLB",
        "title": "Få med planner-oppgaver i azf-tasks-api",
        "url": "https://tasks.office.com/vtfk.no/Home/Task/ASvb451-245sngjlOJOGOB",
        "createdDateTime": "2020-04-14T08:00:55.8407724Z",
        "dueDateTime": "2020-04-30T10:00:00Z",
        "completedDateTime": null,
        "percentComplete": 0,
        "timestamp": 1591082124836
      },
      {
        "id": "N3ZsW6VlfHGF8j6SuVLklJcAB5S6",
        "planId": "JfK4o1hg-eEOog8QxyQUUdFAFEBN",
        "bucketId": "HS6StpJ05k2-jlXXdxQ5tRZcAHoXr",
        "title": "Trakte kaffe",
        "url": "https://tasks.office.com/vtfk.no/Home/Task/N3ZsW6VlfHGF8j6SuVLklJcAB5S6",
        "createdDateTime": "2020-06-02T09:04:04.5709141Z",
        "dueDateTime": "2020-06-02T10:00:00Z",
        "completedDateTime": null,
        "percentComplete": 50,
        "timestamp": 1591082124836
      },
    ],
    "count": 2
  },
  "outlook": {
    "tasks": [
      {
        "id": "AAMkADVlZTg5NGQ1LTFiYjUtNGFkNi05Y2IzLTQooIIOTU1YTE2ZQBGAAAAAAD_cVF-N3ZsW6VlfHGF8j6SuVLklJcAB5S6_9ay2AAC-TVFsaGkIS5GSrsNHI0kDDAAC__JDbAAA=",
        "title": "Nytt fylke, nye muligheter",
        "url": "https://to-do.office.com/tasks/id/AAMkADVlZTg5NGQ1LTFiYjUtNGFkNi05Y2IzLTQooIIOTU1YTE2ZQBGAAAAAAD_cVF-N3ZsW6VlfHGF8j6SuVLklJcAB5S6_9ay2AAC-TVFsaGkIS5GSrsNHI0kDDAAC__JDbAAA=/details",
        "status": "notStarted",
        "importance": "normal",
        "sensitivity": "normal",
        "createdDateTime": "2020-01-01T00:00:00.0000000Z",
        "dueDateTime": "2020-12-31T23:59:59.0000000Z",
        "completedDateTime": null,
        "timestamp": 1591082125060
      }
    ],
    "count": 1
  },
  "totalCount": 5
}
```


### GET /:userPrincipalName
Returns a list of a specific users tasks. User authenticates within the Azure function.

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
  "visma": {
    "tasks": [
      {
        "systemid": "hrm",
        "title": "Timelister til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/TIMESHEET",
        "number": "1",
        "timestamp": 1584696760516
      },
      {
        "systemid": "hrm",
        "title": "Personalmeldinger til behandling",
        "url": "http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/PERSONAL_FORMS_PROCESS",
        "number": "1",
        "timestamp": 1584696760516
      }
    ],
    "count": 2
  },
  "public360": {
    "tasks": [],
    "count": 0
  },
  "planner": {
    "tasks": [
      {
        "id": "ASvb451-245sngjlOJOGOB",
        "planId": "NSFUt_TPKEamkSI77zXq4pcARRUb",
        "bucketId": "Z17wGuAsFEGPdiebiv6cnJcAFoLB",
        "title": "Få med planner-oppgaver i azf-tasks-api",
        "url": "https://tasks.office.com/vtfk.no/Home/Task/ASvb451-245sngjlOJOGOB",
        "createdDateTime": "2020-04-14T08:00:55.8407724Z",
        "dueDateTime": "2020-04-30T10:00:00Z",
        "completedDateTime": null,
        "percentComplete": 0,
        "timestamp": 1591082124836
      },
      {
        "id": "N3ZsW6VlfHGF8j6SuVLklJcAB5S6",
        "planId": "JfK4o1hg-eEOog8QxyQUUdFAFEBN",
        "bucketId": "HS6StpJ05k2-jlXXdxQ5tRZcAHoXr",
        "title": "Trakte kaffe",
        "url": "https://tasks.office.com/vtfk.no/Home/Task/N3ZsW6VlfHGF8j6SuVLklJcAB5S6",
        "createdDateTime": "2020-06-02T09:04:04.5709141Z",
        "dueDateTime": "2020-06-02T10:00:00Z",
        "completedDateTime": null,
        "percentComplete": 50,
        "timestamp": 1591082124836
      },
    ],
    "count": 2
  },
  "outlook": {
    "tasks": [
      {
        "id": "AAMkADVlZTg5NGQ1LTFiYjUtNGFkNi05Y2IzLTQooIIOTU1YTE2ZQBGAAAAAAD_cVF-N3ZsW6VlfHGF8j6SuVLklJcAB5S6_9ay2AAC-TVFsaGkIS5GSrsNHI0kDDAAC__JDbAAA=",
        "title": "Nytt fylke, nye muligheter",
        "url": "https://to-do.office.com/tasks/id/AAMkADVlZTg5NGQ1LTFiYjUtNGFkNi05Y2IzLTQooIIOTU1YTE2ZQBGAAAAAAD_cVF-N3ZsW6VlfHGF8j6SuVLklJcAB5S6_9ay2AAC-TVFsaGkIS5GSrsNHI0kDDAAC__JDbAAA=/details",
        "status": "notStarted",
        "importance": "normal",
        "sensitivity": "normal",
        "createdDateTime": "2020-01-01T00:00:00.0000000Z",
        "dueDateTime": "2020-12-31T23:59:59.0000000Z",
        "completedDateTime": null,
        "timestamp": 1591082125060
      }
    ],
    "count": 1
  },
  "totalCount": 5
}
```

## Development

- Clone the repo
- Install the dependencies: ```$ npm i```
- Add local settings file as described below
- Start the development server: ```$ func start```

### Local settings
*.local.settings.json* file:
```json
{ 
  "Values": {
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "AzureWebJobsStorage": "{AzureWebJobsStorage}",
    "GRAPH_ME_ENDPOINT": "https://graph.microsoft.com/v1.0/me",
    "GRAPH_ORG_ENDPOINT": "https://graph.microsoft.com/v1.0/organization",
    "GRAPH_AUTH_CLIENT_ID": "F8A24C40-6300-4DAA-943D-FA7B84641E96",
    "GRAPH_AUTH_SECRET": "jrglsgjlsngsjjallahemmelighetsfngjsfngsf",
    "GRAPH_TENANT_ID": "08f3813c-9f29-482f-9aec-16ef7cbf477a",
    "VISMA_HRM_URL": "http://vismaserver/hrm_tasks-ws/secure/tasks/username/",
    "VISMA_HRM_USERNAME": "tasks-ws",
    "VISMA_HRM_PASSWORD": "SuperHemmeligPassord",
    "VISMA_ERP_URL": "http://vismaserver/erp_tasks-ws/secure/tasks/username/",
    "VISMA_ERP_USERNAME": "tasks-ws",
    "VISMA_ERP_PASSWORD": "SuperHemmeligPassord",
    "VISMA_FAKTURABEH_URL": "http://vismaserver/fakturabehandling_tasks-ws/secure/tasks/username/",
    "VISMA_FAKTURABEH_USERNAME": "tasks-ws",
    "VISMA_FAKTURABEH_PASSWORD": "SuperHemmeligPassord",
    "VISMA_FAKTURERING_URL": "http://vismaserver/fakturering_tasks-ws/secure/tasks/username/",
    "VISMA_FAKTURERING_USERNAME": "tasks-ws",
    "VISMA_FAKTURERING_PASSWORD": "SuperHemmeligPassord",
    "VISMA_EHANDEL_URL": "http://vismaserver/ehandel_tasks-ws/secure/tasks/username/",
    "VISMA_EHANDEL_USERNAME": "tasks-ws",
    "VISMA_EHANDEL_PASSWORD": "SuperHemmeligPassord",
    "CACHE": "true"
  },
  "Host": {
    "CORS": "*"
  }
}
```

## Deploy Azure functions

- Create an Azure function to deploy to.
- Deploy to Azure: ```$ func azure functionapp publish <function name>```


## License

[MIT](LICENSE)
