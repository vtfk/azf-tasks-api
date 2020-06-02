const getUserTasks = require('../lib/get-user-tasks')
const getGraphUser = require('../lib/graph/get-graph-user')
const HTTPError = require('../lib/http-error')

module.exports = async (context, req) => {
  try {
    const userPrincipalName = req.params.userPrincipalName
    if (!userPrincipalName) {
      throw new HTTPError(400, 'Please pass the userPrincipalName in the url')
    }

    context.log(['tasks', 'get-user-tasks', userPrincipalName, 'get-graph-user'])
    const graphUser = await getGraphUser(context, { userPrincipalName })
    context.log(['tasks', 'get-user-tasks', userPrincipalName, 'get-graph-user', graphUser.id])

    context.log(['tasks', 'get-user-tasks', userPrincipalName, 'get-user-tasks'])
    const tasks = await getUserTasks(context, graphUser)
    context.log(['tasks', 'get-user-tasks', userPrincipalName, 'return', tasks.totalCount, 'tasks'])

    context.res = {
      status: 200,
      body: {
        user: graphUser,
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
