const Parser = require('xml2js-parser')
const parser = new Parser({ trim: true })

module.exports = async (data, systemid) => {
  const parsed = await parser.parseString(data)
  const tasks = (parsed.tasks.length < 1 || typeof parsed.tasks.task === 'undefined') ? [] : parsed.tasks.task

  return tasks.map(task => {
    return {
      systemid,
      title: task.$.text || '',
      url: task.$.link || '',
      count: parseInt(task.$.number) || 0,
      timestamp: new Date().getTime()
    }
  })
}
