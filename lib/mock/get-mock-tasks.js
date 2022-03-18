const generateMockTasks = require('./generate-mock-tasks')

module.exports = context => {
  const mockTasks = generateMockTasks()
  context.log(['tasks', 'get-mock-tasks', mockTasks.user.userPrincipalName, 'outlook', mockTasks.outlook.count])
  context.log(['tasks', 'get-mock-tasks', mockTasks.user.userPrincipalName, 'planner', mockTasks.planner.count])
  context.log(['tasks', 'get-mock-tasks', mockTasks.user.userPrincipalName, 'visma', mockTasks.visma.count])
  context.log(['tasks', 'get-mock-tasks', mockTasks.user.userPrincipalName, 'public360', mockTasks.public360.count])

  return mockTasks
}
