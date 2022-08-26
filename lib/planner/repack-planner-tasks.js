const { planner } = require('../../config')

module.exports = (task) => {
  let percentComplete = 0
  if (task.checklistItemCount > 0) {
    percentComplete = Math.floor((task.checklistItemCount - task.activeChecklistItemCount) * 100 / task.checklistItemCount)
  }

  return {
    id: task.id,
    planId: task.planId,
    bucketId: task.bucketId,
    title: task.title || '',
    url: `${planner.link}${task.id}`,
    createdDateTime: task.createdDateTime || null,
    dueDateTime: task.dueDateTime || null,
    completedDateTime: task.completedDateTime || null,
    percentComplete,
    timestamp: new Date().getTime()
  }
}
