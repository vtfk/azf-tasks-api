const axios = require('axios')
const { graph } = require('../config')

module.exports = async (context, token) => {
  const options = {
    url: graph.org.url,
    method: 'GET',
    headers: {
      Authorization: token
    },
    params: {
      $select: graph.org.properties
    }
  }

  try {
    const { data } = await axios(options)
    return data
  } catch (err) {
    context.log.error('tasks', 'get-graph-org', 'err', err)
    throw err
  }
}
