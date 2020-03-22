const { CACHE, graph: { org: { tenantId } } } = require('../config')
const getGraphUser = require('../lib/get-graph-user')
const getGraphOrg = require('../lib/get-graph-org')
const getVismaTasks = require('../lib/get-visma-tasks')

const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 3600, checkperiod: 120 }) : false

module.exports = async (context, req) => {
  const token = req.headers.authorization || null
  if (!token) {
    return context.res.status(401).send('Unauthorized. Missing authorization header.')
  }

  let samAccountName, graphUser, graphOrg

  try {
    graphUser = await getGraphUser(context, token)
    samAccountName = graphUser.onPremisesSamAccountName
    if (!graphUser || !samAccountName) {
      return context.res.status(404).send('No user found')
    }
  } catch (err) {
    context.log.error(['tasks', 'graph-user', 'err', err])
    return context.res.status(500).send('Unable to get user')
  }

  try {
    graphOrg = await getGraphOrg(context, token)
    const userTenantId = graphOrg.value[0].id
    if (userTenantId !== tenantId) {
      context.log.error(['tasks', samAccountName, `Tenant ID not matching ${tenantId}`, userTenantId])
      return context.res.status(401).send('Invalid tenant id')
    }
  } catch (err) {
    context.log.error(['tasks', samAccountName, 'graph-org', 'err', err])
    return context.res.status(500).send('Unable to get organization')    
  }

  context.log('tasks', samAccountName)

  if (cache) {
    const cachedUserTasks = cache.get(samAccountName)
    if (cachedUserTasks) {
      return context.res.json(cachedUserTasks)
    }
  }

  try {
    const vismaTasks = await getVismaTasks(context, samAccountName)
    const payload = {
      user: graphUser,
      tasks: [...vismaTasks]
    }

    context.log(['tasks', samAccountName, 'tasks', payload.tasks.length])

    if (cache) {
      cache.set(samAccountName, payload)
    }

    return context.res.json(payload)
  } catch (err) {
    context.log.error(['tasks', samAccountName, 'err', err])
    context.res.status(500).json({ error: err.message })
  }
}
