const { planner } = require('../../config')

module.exports = (task) => {
  return {
    id: task.id,
    planId: task.planId,
    bucketId: task.bucketId,
    title: task.title || '',
    url: `${planner.link}${task.id}`,
    createdDateTime: task.createdDateTime || null,
    dueDateTime: task.dueDateTime || null,
    completedDateTime: task.completedDateTime || null,
    percentComplete: task.percentComplete || 0,
    timestamp: new Date().getTime()
  }
}
