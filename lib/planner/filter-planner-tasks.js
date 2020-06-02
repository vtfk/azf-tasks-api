module.exports = (task) => {
  return !(task.completedDateTime || task.percentComplete === 100)
}
