const getUserTasks = require('../lib/get-user-tasks')
const getGraphUser = require('../lib/graph/get-graph-user')
const HTTPError = require('../lib/http-error')

module.exports = async (context, req) => {
  try {
    const samAccountName = req.params.username
    if (!samAccountName) {
      throw new HTTPError(400, 'Please pass a username in the url')
    }

    context.log('tasks', samAccountName)
    const tasks = await getUserTasks(context, samAccountName)

    context.res = {
      status: 200,
      body: {
        user: {
          onPremisesSamAccountName: samAccountName
        },
        ...tasks
      }
    }
  } catch (err) {
    context.res = {
      status: err.statusCode || 500,
      body: err.message || 'Internal server error'
    }
  }
}
