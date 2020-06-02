const authGraphUser = require('../lib/auth-graph-user')
const getUserTasks = require('../lib/get-user-tasks')

module.exports = async (context, req) => {
  try {
    const graphUser = await authGraphUser(context, req)
    context.log(['tasks', 'get-my-tasks', graphUser.userPrincipalName])

    const tasks = await getUserTasks(context, graphUser, req.headers.authorization)
    context.log(['tasks', 'get-my-tasks', graphUser.userPrincipalName, 'tasks', tasks.totalCount])

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
