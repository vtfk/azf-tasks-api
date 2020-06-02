module.exports = (task1, task2) => {
  if (task1.dueDateTime && !task2.dueDateTime) return -1
  if (!task1.dueDateTime && task2.dueDateTime) return 1

  if (task1.dueDateTime && task2.dueDateTime && (task1.dueDateTime < task2.dueDateTime.dateTime)) return -1
  if (task1.dueDateTime && task2.dueDateTime && (task1.dueDateTime > task2.dueDateTime.dateTime)) return 1

  if (new Date(task1.createdDateTime) < new Date(task2.createdDateTime)) return -1
  if (new Date(task1.createdDateTime) > new Date(task2.createdDateTime)) return 1

  return 0
}
