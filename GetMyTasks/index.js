const authGraphUser = require('../lib/auth-graph-user')
const getUserTasks = require('../lib/get-user-tasks')

module.exports = async (context, req) => {
  try {
    const graphUser = await authGraphUser(context, req)
    const samAccountName = graphUser.onPremisesSamAccountName

    context.log('tasks', samAccountName)
    const tasks = await getUserTasks(context, samAccountName)

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
