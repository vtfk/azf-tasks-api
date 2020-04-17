const { graph: { org: { tenantId } } } = require('../config')
const getGraphUser = require('../lib/get-graph-user')
const getGraphOrg = require('../lib/get-graph-org')

module.exports = async (context, req) => {
  const token = req.headers.authorization || null
  if (!token) {
    throw { message: 'Unauthorized. Missing authorization header.', status: 401 }
  }

  let samAccountName, graphUser, graphOrg

  try {
    graphUser = await getGraphUser(context, token)
    samAccountName = graphUser.onPremisesSamAccountName
    if (!graphUser || !samAccountName) {
      throw { message: 'No user found', status: 404 }
    }
  } catch (err) {
    context.log.error(['tasks', 'graph-user', 'err', err])
    throw { message: 'Unable to get user.', status: 500 }
  }

  try {
    graphOrg = await getGraphOrg(context, token)
    const userTenantId = graphOrg.value[0].id
    if (userTenantId !== tenantId) {
      context.log.error(['tasks', samAccountName, `Tenant ID not matching ${tenantId}`, userTenantId])
      throw { message: 'Invalid tenant ID', status: 401 }
    }
  } catch (err) {
    context.log.error(['tasks', samAccountName, 'graph-org', 'err', err])
    throw { message: 'Unable to get organization', status: 500 }
  }

  return graphUser
}