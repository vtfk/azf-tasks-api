const axios = require('axios')
const repackTasks = require('./repack-outlook-tasks')
const sortTasks = require('./sort-outlook-tasks')
const { outlook } = require('../../config')

module.exports = async (context, token, userPrincipalName) => {
  const options = {
    url: `${outlook.graphUrl}`,
    method: 'GET',
    headers: {
      Authorization: token
    },
    params: {
      $limit: outlook.maxTasks,
      $filter: outlook.filter
    }
  }

  try {
    const { data } = await axios(options)
    const repacked = data.value.map(repackTasks)
    const sorted = repacked.sort(sortTasks)
    return sorted
  } catch (err) {
    context.log.error(['tasks', 'get-outlook-tasks', 'err', err])
    throw err
  }
}
