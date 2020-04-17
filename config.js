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
  graph: {
    me: {
      url: process.env.GRAPH_ME_ENDPOINT || 'https://graph.microsoft.com/v1.0/me',
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
