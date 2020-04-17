const getUserTasks = require('../lib/get-user-tasks')

module.exports = async (context, req) => {
  try {
    const samAccountName = req.params.username
    if (!samAccountName) {
      throw { message: 'Please pass a username in the url', status: 400 }
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
      status: err.status || 500,
      body: err.message || 'Internal server error'
    }
  }
}
