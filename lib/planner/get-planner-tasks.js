const axios = require('axios')
const repackTasks = require('./repack-planner-tasks')
const filterTasks = require('./filter-planner-tasks')
const { graph: { user }, planner } = require('../../config')

module.exports = async (context, token, userPrincipalName) => {
  const options = {
    url: `${user.meUrl}${planner.graphUrl}`,
    method: 'GET',
    headers: {
      Authorization: token
    }
  }

  try {
    const { data } = await axios(options)
    const repacked = data.value.map(repackTasks)
    const filtered = repacked.filter(filterTasks)

    const withDueDate = filtered.filter(item => item.dueDateTime)
    const withoutDueDate = filtered.filter(item => !item.dueDateTime)

    const sorted = withDueDate.sort((a, b) => (a.dueDateTime < b.dueDateTime) ? -1 : ((a.dueDateTime > b.dueDateTime) ? 1 : 0))
    return [...sorted, ...withoutDueDate]
  } catch (err) {
    context.log.error(['tasks', 'get-planner-tasks', userPrincipalName, 'err', err])
    throw err
  }
}
