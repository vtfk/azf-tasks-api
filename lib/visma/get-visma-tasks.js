const axios = require('axios')
const repackVisma = require('./repack-visma-tasks')
const HTTPError = require('../../lib/http-error')

const { visma } = require('../../config')

module.exports = async (context, { onPremisesSamAccountName: username }) => {
  const tasks = []

  for (const serviceId in visma) {
    const service = visma[serviceId]

    const options = {
      url: `${service.url}${username}`,
      method: 'GET',
      auth: {
        username: service.username,
        password: service.password
      }
    }

    if (options.url.toLowerCase().startsWith('https://')) {
      options.httpsAgent = new axios.https.Agent({
        rejectUnauthorized: false
      })
    }

    try {
      const res = await axios(options)
      const serviceTasks = await repackVisma(res.data, serviceId)
      tasks.push(...serviceTasks)
    } catch (err) {
      const errMsg = err.response && err.response.data ? err.response.data : err.message

      if (errMsg.endsWith('does not exist')) {
        context.log.error(['tasks', 'get-visma-tasks', serviceId, 'err', 'user not found', username])
        throw new HTTPError(404, `Unknown username: ${username}`)
      }

      context.log.error(['tasks', 'get-visma-tasks', serviceId, 'err', err])
      throw new HTTPError(500, errMsg)
    }
  }

  return tasks
}
