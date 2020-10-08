const { CACHE } = require('../config')
const getVismaTasks = require('../lib/visma/get-visma-tasks')
const getPlannerTasks = require('../lib/planner/get-planner-tasks')
const getOutlookTasks = require('../lib/outlook/get-outlook-tasks')
const HTTPError = require('../lib/http-error')

const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 600, checkperiod: 120 }) : false

module.exports = async (context, graphUser, token) => {
  const { userPrincipalName, onPremisesSamAccountName: samAccountName } = graphUser

  if (cache) {
    const cachedUserTasks = cache.get(userPrincipalName)
    if (cachedUserTasks) {
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
    context.log.error(['tasks', 'get-user-tasks', userPrincipalName, 'get-planner-tasks', 'err', error])
  }

  let outlookTasks = []
  try {
    if (token) outlookTasks = await getOutlookTasks(context, token, userPrincipalName)
  } catch (error) {
    context.log.error(['tasks', 'get-user-tasks', userPrincipalName, 'get-outlook-tasks', 'err', error])
  }

  try {
    const tasks = {
      outlook: {
        tasks: [...outlookTasks],
        count: outlookTasks.length || 0
      },
      planner: {
        tasks: [...plannerTasks],
        count: plannerTasks.length || 0
      },
      visma: {
        tasks: [...vismaTasks],
        count: vismaTasks.reduce((acc, task) => acc + task.count, 0) || 0
      },
      public360: {
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
    context.log.error(['tasks', userPrincipalName, 'err', err])
    throw new HTTPError(err.statusCode || 500, err.message)
  }
}
