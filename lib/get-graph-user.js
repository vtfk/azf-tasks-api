const axios = require('axios')
const { graph } = require('../config')

module.exports = async (context, token) => {
  const options = {
    url: graph.me.url,
    method: 'GET',
    headers: {
      Authorization: token
    },
    params: {
      $select: graph.me.properties
    }
  }

  try {
    const { data } = await axios(options)
    return data
  } catch (err) {
    context.log.error('tasks', 'get-graph-user', 'err', err)
    throw err
  }
}
