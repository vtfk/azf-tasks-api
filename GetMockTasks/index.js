const getMockTasks = require('../lib/mock/get-mock-tasks')

module.exports = async (context, req) => {
  const mockTasks = getMockTasks(context)
  context.log(['tasks', 'get-mock-tasks', mockTasks.user.userPrincipalName, 'total', mockTasks.totalCount])

  return {
    status: 200,
    body: mockTasks
  }
}
