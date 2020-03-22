const axios = require('axios')
const repackVisma = require('./repack-visma-tasks')
const { visma } = require('../config')

module.exports = async (context, username) => {
  const options = {
    url: `${visma.url}${username}`,
    method: 'GET',
    auth: {
      username: visma.username,
      password: visma.password
    }
  }

  if(options.url.toLowerCase().startsWith('https://')) {
    options.httpsAgent = new https.Agent({  
      rejectUnauthorized: false
    })
  }

  try {
    const { data } = await axios(options)
    return await repackVisma(data)
  } catch (err) {
    context.log.error(['tasks', 'get-visma-tasks', 'err', err])
    throw err
  }
}
