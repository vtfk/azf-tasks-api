const { CACHE } = require('../config')
const getGraphToken = require('./graph/get-graph-token')
const getVismaTasks = require('../lib/visma/get-visma-tasks')
const getPlannerTasks = require('../lib/planner/get-planner-tasks')
const getOutlookTasks = require('../lib/outlook/get-outlook-tasks')
const HTTPError = require('../lib/http-error')

const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 600, checkperiod: 120 }) : false

module.exports = async (context, graphUser, token, force = false) => {
  const { userPrincipalName, onPremisesSamAccountName: samAccountName } = graphUser

  if (cache && !force) {
    const cachedUserTasks = cache.get(userPrincipalName)
    if (cachedUserTasks) {
      context.log(['tasks', 'get-user-tasks', userPrincipalName, 'from cache', cachedUserTasks.totalCount])
      return cachedUserTasks
    }
  }

  let vismaTasks = []
  try {
    if (samAccountName) vismaTasks = await getVismaTasks(context, graphUser)
  } catch (error) {
    context.log.error(['tasks', 'get-user-tasks', userPrincipalName, 'get-visma-tasks', 'err', error])
  }

  const p360Tasks = []

  let plannerTasks = []
  try {
    if (token) plannerTasks = await getPlannerTasks(context, token, userPrincipalName)
  } catch (error) {
  }

  let outlookTasks = []
  try {
    if (token) outlookTasks = await getOutlookTasks(context, token, userPrincipalName)
  } catch (error) {
    const graphToken = await getGraphToken(context)
    try {
      if (graphToken) outlookTasks = await getOutlookTasks(context, graphToken, userPrincipalName, true)
    } catch (error) {
      context.log.error(['tasks', 'get-user-tasks', userPrincipalName, 'get-outlook-tasks', 'err', error])
    }
  }

  try {
    const tasks = {
      outlook: {
        tabName: 'To Do',
        showEmptyTab: true,
        tasks: [...outlookTasks],
        count: outlookTasks.length || 0
      },
      planner: {
        tabName: 'Planner',
        showEmptyTab: true,
        tasks: [...plannerTasks],
        count: plannerTasks.length || 0
      },
      visma: {
        tabName: 'Visma',
        showEmptyTab: false,
        tasks: [...vismaTasks],
        count: vismaTasks.reduce((acc, task) => acc + task.count, 0) || 0
      },
      public360: {
        tabName: 'Public 360',
        showEmptyTab: false,
        tasks: [...p360Tasks],
        count: p360Tasks.length || 0
      }
    }

    tasks.totalCount = tasks.visma.count + tasks.public360.count + tasks.planner.count + tasks.outlook.count || 0
    context.log(['tasks', 'get-user-tasks', userPrincipalName, 'tasks', tasks.totalCount])

    if (cache) {
      cache.set(userPrincipalName, tasks)
    }

    return tasks
  } catch (err) {
    context.log.error(['tasks', 'get-user-tasks', userPrincipalName, 'err', err])
    throw new HTTPError(err.statusCode || 500, err.message)
  }
}
