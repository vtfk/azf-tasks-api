const { outlook } = require('../../config')

module.exports = (task) => {
  return {
    id: task.id,
    title: task.subject || '',
    url: `${outlook.link}${task.id}/details`,
    status: task.status || 'notStarted',
    importance: task.importance || 'normal',
    sensitivity: task.sensitivity || 'normal',
    createdDateTime: task.createdDateTime || null,
    dueDateTime: task.dueDateTime ? new Date(task.dueDateTime.dateTime) : null,
    completedDateTime: task.completedDateTime || null,
    timestamp: new Date().getTime()
  }
}
