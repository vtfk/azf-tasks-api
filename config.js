module.exports = {
  CACHE: process.env.CACHE === 'true',
  visma: {
    hrm: {
      url: process.env.VISMA_HRM_URL || 'http://localhost:8290/hrm_ws/secure/tasks/username/',
      username: process.env.VISMA_HRM_USERNAME || 'username',
      password: process.env.VISMA_HRM_PASSWORD || 'password'
    },
    erp: {
      url: process.env.VISMA_ERP_URL || 'http://localhost:8290/erp_ws/secure/tasks/username/',
      username: process.env.VISMA_ERP_USERNAME || 'username',
      password: process.env.VISMA_ERP_PASSWORD || 'password'
    },
    fakturabehandling: {
      url: process.env.VISMA_FAKTURABEH_URL || 'http://localhost:8290/fakturabehandling_ws/secure/tasks/username/',
      username: process.env.VISMA_FAKTURABEH_USERNAME || 'username',
      password: process.env.VISMA_FAKTURABEH_PASSWORD || 'password'
    },
    fakturering: {
      url: process.env.VISMA_FAKTURERING_URL || 'http://localhost:8290/fakturering_ws/secure/tasks/username/',
      username: process.env.VISMA_FAKTURERING_USERNAME || 'username',
      password: process.env.VISMA_FAKTURERING_PASSWORD || 'password'
    },
    ehandel: {
      url: process.env.VISMA_EHANDEL_URL || 'http://localhost:8290/ehandel_ws/secure/tasks/username/',
      username: process.env.VISMA_EHANDEL_USERNAME || 'username',
      password: process.env.VISMA_EHANDEL_PASSWORD || 'password'
    }
  },
  public360: {

  },
  planner: {
    graphUrl: process.env.PLANNER_ENDPOINT || '/planner/tasks',
    link: process.env.PLANNER_LINK_URL || 'https://tasks.office.com/vtfk.no/Home/Task/',
    maxTasks: parseInt(process.env.PLANNER_MAX_TASKS) || 100
  },
  outlook: {
    graphUrl: process.env.OUTLOOK_ENDPOINT || 'https://graph.microsoft.com/beta/me/outlook/tasks',
    link: process.env.OUTLOOK_LINK_URL || 'https://to-do.office.com/tasks/id/',
    maxTasks: parseInt(process.env.OUTLOOK_MAX_TASKS) || 100,
    filter: process.env.OUTLOOK_FILTER || 'status ne \'completed\''
  },
  graph: {
    auth: {
      url: process.env.GRAPH_AUTH_ENDPOINT || 'https://login.microsoftonline.com/vtfk.onmicrosoft.com/oauth2/v2.0/token',
      clientId: process.env.GRAPH_AUTH_CLIENT_ID || '123456-1234-1234-123456',
      secret: process.env.GRAPH_AUTH_SECRET || 'wnksdnsjblnsfjb',
      scope: process.env.GRAPH_AUTH_SCOPE || 'https://graph.microsoft.com/.default',
      grantType: process.env.GRAPH_AUTH_GRANT_TYPE || 'client_credentials'
    },
    user: {
      meUrl: process.env.GRAPH_ME_ENDPOINT || 'https://graph.microsoft.com/v1.0/me',
      userUrl: process.env.GRAPH_USERS_ENDPOINT || 'https://graph.microsoft.com/v1.0/users',
      properties: 'id,userPrincipalName,onPremisesSamAccountName,displayName'
    },
    org: {
      url: process.env.GRAPH_ORG_ENDPOINT || 'https://graph.microsoft.com/v1.0/organization',
      properties: 'id',
      tenantId: process.env.GRAPH_TENANT_ID || '08f3813c-9f29-482f-9aec-16ef7cbf477a'
    }
  },
  papertrail: {
    hostname: process.env.PAPERTRAIL_HOSTNAME || 'visma-tasks-api',
    host: process.env.PAPERTRAIL_HOST || 'logs.papertrailapp.com',
    port: process.env.PAPERTRAIL_PORT || 12345
  }
}
