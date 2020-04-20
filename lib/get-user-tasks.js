const { CACHE } = require('../config')
const getVismaTasks = require('../lib/visma/get-visma-tasks')
const HTTPError = require('../lib/http-error')

const NodeCache = require('node-cache')
const cache = CACHE ? new NodeCache({ stdTTL: 3600, checkperiod: 120 }) : false

module.exports = async (context, samAccountName) => {
  if (cache) {
    const cachedUserTasks = cache.get(samAccountName)
    if (cachedUserTasks) {
      return cachedUserTasks
    }
  }

  try {
    const vismaTasks = await getVismaTasks(context, samAccountName)
    const p360Tasks = []

    const tasks = {
      visma: {
        tasks: [...vismaTasks],
        count: vismaTasks.reduce((acc, task) => acc + task.count, 0) || 0
      },
      public360: {
        tasks: [...p360Tasks],
        count: p360Tasks.length || 0
      }
    }

    tasks.totalCount = tasks.visma.count + tasks.public360.count || 0
    context.log(['tasks', samAccountName, 'tasks', tasks.totalCount])

    if (cache) {
      cache.set(samAccountName, tasks)
    }

    return tasks
  } catch (err) {
    context.log.error(['tasks', samAccountName, 'err', err])
    throw new HTTPError(err.statusCode || 500, err.message)
  }
}
