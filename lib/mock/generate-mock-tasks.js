const getRandomNumber = (min = 0, max = 10) => {
  const num = Math.round(Math.random() * max)
  if (num < min) return min
  else if (num > max) return max
  return num
}

const getRandomBoolean = () => getRandomNumber() > 5

const getTimestamp = (num = 0) => {
  const d = new Date()
  return d.setDate(d.getDate() + num)
}

const getStartDate = (num, backInTime = false) => {
  const d = new Date()
  if (backInTime) {
    num = -num
  }
  return new Date(d.setDate(d.getDate() + num)).toISOString()
}

const generateData = (data, type) => {
  const completed = getRandomBoolean()
  if (type === 'planner') {
    return {
      ...data,
      completedDateTime: completed ? getStartDate(getRandomNumber(0, 10)) : null,
      percentComplete: completed ? 100 : getRandomNumber(0, 99)
    }
  } else if (type === 'outlook') {
    return {
      ...data,
      status: getRandomBoolean() ? 'started' : completed ? 'completed' : 'notStarted',
      completedDateTime: completed ? getStartDate(getRandomNumber(0, 10)) : null
    }
  }
}

module.exports = () => {
  return {
    user: {
      '@odata.context': 'https://graph.microsoft.com/v1.0/$metadata#users(id,userPrincipalName,onPremisesSamAccountName,displayName)/$entity',
      id: '2f0d6c10-478b-4eec-8e46-fb15f3059505',
      userPrincipalName: 'bjarne.betjent@vtfk.no',
      onPremisesSamAccountName: 'bja0101',
      displayName: 'Bjarne Betjent'
    },
    outlook: {
      tabName: 'To Do',
      showEmptyTab: true,
      tasks: [
        generateData({
          id: 'AAMkADVlZTg5NGQ1LTFiYjUtNGFkNi05Y2IzLTQooIIOTU1YTE2ZQBGAAAAAAD_cVF-N3ZsW6VlfHGF8j6SuVLklJcAB5S6_9ay2AAC-TVFsaGkIS5GSrsNHI0kDDAAC__JDbAAA=',
          title: 'Nytt fylke, nye muligheter',
          url: 'https://to-do.office.com/tasks/id/AAMkADVlZTg5NGQ1LTFiYjUtNGFkNi05Y2IzLTQooIIOTU1YTE2ZQBGAAAAAAD_cVF-N3ZsW6VlfHGF8j6SuVLklJcAB5S6_9ay2AAC-TVFsaGkIS5GSrsNHI0kDDAAC__JDbAAA=/details',
          status: 'notStarted',
          importance: 'normal',
          sensitivity: 'normal',
          createdDateTime: '2020-01-01T00:00:00.0000000Z',
          dueDateTime: getStartDate(getRandomNumber(0, 10), getRandomBoolean()),
          completedDateTime: null,
          timestamp: getTimestamp()
        }, 'outlook')
      ],
      count: 1
    },
    planner: {
      tabName: 'Planner',
      showEmptyTab: true,
      tasks: [
        generateData({
          id: 'ASvb451-245sngjlOJOGOB',
          planId: 'NSFUt_TPKEamkSI77zXq4pcARRUb',
          bucketId: 'Z17wGuAsFEGPdiebiv6cnJcAFoLB',
          title: 'Få med planner-oppgaver i azf-tasks-api',
          url: 'https://tasks.office.com/vtfk.no/Home/Task/ASvb451-245sngjlOJOGOB',
          createdDateTime: '2020-04-14T08:00:55.8407724Z',
          dueDateTime: getStartDate(getRandomNumber(0, 10), getRandomBoolean()),
          completedDateTime: null,
          percentComplete: 0,
          timestamp: getTimestamp()
        }, 'planner'),
        generateData({
          id: 'N3ZsW6VlfHGF8j6SuVLklJcAB5S6',
          planId: 'JfK4o1hg-eEOog8QxyQUUdFAFEBN',
          bucketId: 'HS6StpJ05k2-jlXXdxQ5tRZcAHoXr',
          title: 'Trakte kaffe',
          url: 'https://tasks.office.com/vtfk.no/Home/Task/N3ZsW6VlfHGF8j6SuVLklJcAB5S6',
          createdDateTime: '2020-06-02T09:04:04.5709141Z',
          dueDateTime: getStartDate(getRandomNumber(0, 10), getRandomBoolean()),
          completedDateTime: null,
          percentComplete: 50,
          timestamp: getTimestamp()
        }, 'planner')
      ],
      count: 2
    },
    visma: {
      tabName: 'Visma',
      showEmptyTab: false,
      tasks: [
        {
          systemid: 'hrm',
          title: 'Timelister til behandling',
          url: 'http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/TIMESHEET',
          count: '1',
          timestamp: getTimestamp(getRandomNumber(1, 10))
        },
        {
          systemid: 'hrm',
          title: 'Personalmeldinger til behandling',
          url: 'http://vismaserver:8080/hrm/organisasjon/something/ORGANIZATION_TASKS_NODE/PERSONAL_FORMS_PROCESS',
          count: '1',
          timestamp: getTimestamp(getRandomNumber(1, 10))
        }
      ],
      count: 2
    },
    public360: {
      tabName: 'Public 360',
      showEmptyTab: false,
      tasks: [],
      count: 0
    },
    totalCount: 5
  }
}
