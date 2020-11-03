const express = require('express')
const knex = require('knex')
const cors = require('cors')

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'michaelnix',
        password: 'Womack',
        database: 'patientdb'
    }
})

const app = express()

app.use(express.json())
app.use(cors())


app.post('/newuser', async (req,res) => {
    const { usertype, initials, name } = req.body

    await db('users')
    .insert({
        initials: initials,
        name: name,
        usertype: usertype
    })

    const newList = await db('users').returning('*').select('*').orderBy('name', 'asc')

    res.status(200).json(newList)

      // .then((newList) => {
      //     res.status(200).json(newList)
      // })
  // .catch(err => console.log('Error', err))
})

app.post('/newreferrer', async (req,res) => {
    const { initials, name } = req.body

    await db('referrer')
          .insert({
              initials: initials,
              name: name
          })
    
    const newList = await db('referrer').returning('*').select('*').orderBy('name', 'asc')

    res.status(200).json(newList)

    // .catch(err => console.log('Error', err))
})

app.post('/newdepartment', async (req,res) => {
    const { department } = req.body

    await db('departments')
      .insert({
        name: department,
        headofdepartment: ''
      })

    const newList = await db('departments').select('*').returning('*').orderBy('name', 'asc')

    res.status(200).json(newList)

    // .catch(err => console.log('Error', err))
})

app.post('/newcategory', async (req,res) => {
  const { category, cost } = req.body

  await db('techtype')
    .insert({
        type: category,
        techtypecost: cost
    })
  
  const newList = await db.select('*')
  .returning('*')
  .from('techtype')

  res.status(200).json(newList)

  // .catch(err => console.log('Error', err))
})

app.post('/', async (req, res) => {
    const { seqNum, day, job, permission, requestedBy, department, hospitalNumber, patientSurname, patientForename, description, user, issues, type, category } = req.body

    let countTotal;

    await db('index')
      .insert({
          jobnumber: job,
          requestedby: requestedBy,
          type: type,
          sequencenumber: seqNum,
          day: day,
          department: department
      })

    const total = await db('index').count('id')
    countTotal = total[0].count

    if (type === 'p') {
      await db('patientjobs')
        .returning('*')
        .insert({
            jobnumber: job,
            permission: permission,
            hospitalnumber: hospitalNumber,
            patientsurname: patientSurname,
            patientforename: patientForename,
            description: description,
            photographer: user
        })
    } else if (type === 't') {
      await db('techjobs')
        .returning('*')
        .insert({
            jobnumber: job,
            category: category,
            description: description,
            quantity: 1,
            designer: user
        })
      }
    res.send(countTotal)
    if (issues.length > 0) {
        db('issued')
        .insert({
            jobnumber: job,
            type: issues[0],
            date: issues[1],
            notes: issues[2],
            qty: issues[3],
            cost: issues[4]
            
        }).catch(console.log)
    }
})

app.post('/addissued', async (req,res) => {
    const { jobnumber, type, date, notes, qty, cost } = req.body

    await db('issued')
    .insert({
        jobnumber: jobnumber,
        type: type,
        date: date,
        notes: notes,
        qty: qty,
        cost: cost
    })

    const updatedIssues = await db('issued').returning('*').select('*').where('jobnumber', jobnumber).orderBy('id', 'asc')
    //     .then((updatedIssues) => {
    res.status(200).json(updatedIssues)
    //     })
    //     .catch(err => console.log('Error', err))
    // })
})

app.delete('/deleteissued', async (req, res) => {

  const {id, jobnumber} = req.body

  await db('issued').where('id', id).del()
  const updatedIssues = await db('issued').returning('*').select('*').where('jobnumber', jobnumber).orderBy('id', 'asc')
      // .then(updatedIssues => {
  res.status(200).json(updatedIssues)
      // })
      // .catch(err => console.log(err))
  // })
})

app.delete('/deletenewissues', async (req, res) => {
  const { jobnumber, count } = req.body

  const result = await db.select('*').from('issued').where('jobnumber', jobnumber).orderBy('id', 'desc').limit(count)

  result.map(async (issue) => {
    const id = issue.id
    await db.select('*').from('issued').where('id', id).del()
  })
})

app.put('/editrecord', async (req, res) => {

    const { job, permission, requestedBy, hospitalNumber, patientSurname, patientForename, description, photographer, department, type, category, designer} = req.body

    await db('index').where('jobnumber', job)
      .update({
        requestedby: requestedBy,
        department: department
      })

    if (type === 'p') {
        await db('patientjobs').where('jobnumber', job)
          .update({
              permission: permission,
              hospitalnumber: hospitalNumber,
              patientsurname: patientSurname,
              patientforename: patientForename,
              description: description,
              photographer: photographer
          })
            // .then(() => res.status(200).json('Success'))
            // .catch(err => console.log('Error', err))
    } else if (type === 't') {
                await db('techjobs').where('jobnumber', job)
                  .update({
                    category: category,
                    description: description,
                    designer: designer
                  })
                // .then(() => res.status(200).json('Success'))
                // .catch(err => console.log('Error', err))
    }
})

app.delete('/deleterecord', async (req, res) => {
    const {job,recordType} = req.body

    await db('index').where('jobnumber', job).del()
    await db('issued').where('jobnumber', job).del()

    if (recordType === 'p') {
      const deleted = await db.select('*').from('patientjobs').where('jobnumber', job).del()
      res.status(200).json(`Deleted: ${deleted}`)
            // .catch(err => console.log(`Erroneous: ${err}`))
    } else if (recordType === 't') {
      const deleted = await db.select('*').from('techjobs').where('jobnumber', job).del()
      res.status(200).json(`Deleted: ${deleted}`)
            // .catch(err => console.log(`Erroneous: ${err}`))
    }
})

app.delete('/deleteuser', async (req,res) => {
  const { toDelete } = req.body

  for (c = 0; c < toDelete.length; c++) {
    await db.select('*').from('users').where('name', toDelete[c]).del()

    // if (c === toDelete.length) {
      // }
  }
  const updatedList = await db.select('*').from('users')
  res.send(updatedList)
})

app.delete('/deletereferrer', async (req,res) => {
  const { toDelete } = req.body
  console.log(toDelete)

  for (c = 0; c < toDelete.length; c++) {
    await db.select('*').from('referrer').where('name', toDelete[c]).del()
  }

  const updatedList = await db.select('*').from('referrer')
  res.send(updatedList)
})

app.delete('/deletedepartment', async (req,res) => {
  const { toDelete } = req.body

  for (c = 0; c < toDelete.length; c++) {
    await db.select('*').from('departments').where('name', toDelete[c]).del()
  }

  const updatedList = await db.select('*').from('departments')
  res.send(updatedList)
})

app.delete('/deletecategory', async (req, res) => {
  const { toDelete } = req.body

  for (c = 0; c < toDelete.length; c++) {
    await db('techtype').where('type', toDelete[c]).select('*').del()
  }

  const updatedList = await db('techtype').select('*')
  res.send(updatedList)
})

app.get('/gettechcost/:cat', async (req, res) => {
  const { cat } = req.params

  const result = await db.select('techtypecost').from('techtype').where('type', cat)
  const techTypeCost = result[0].techtypecost
  res.send(techTypeCost)
})

// FUNCTION TO FETCH A RECORD. CALLED FROM ALL RECORD FETCH ROUTES
const getRecord = async (order, id, res) => {

  let data = []

  const count = await db('index').count('id')
  data[5] = count[0].count

  let jobNum

  const recId = id <1 ? 1 : data[5]

  const index = await db('index').orderBy('id', order).select('*').limit(recId)
  data[0] = index[id].type
  data[3] = index[id].department
  data[4] = index[id].requestedby
  data[6] = index[id].sequencenumber
  data[7] = index[id].day
  jobNum = index[id].jobnumber

  if (index[id].type === 'p') {
    const patientjob = await db('patientjobs').where('jobnumber', jobNum).select('*')
    data[1] = patientjob[0]
  } else if (index[id].type === 't') {
    const techjob = await db('techjobs').where('jobnumber', jobNum).select('*')
    data[1] = techjob[0]
  }

  const issued = await db('issued').where('jobnumber', jobNum).orderBy('id', 'asc').select('*')
  data[2] = issued

  res.send(data)
}

// FETCH RECORD ROUTES
app.get('/firstrec/:id', (req, res) => {
  const { id } = req.params
  getRecord('asc', id, res)
})

app.get('/lastrec/:id', (req, res) => {
  const { id } = req.params
  getRecord('desc', id, res)
})

app.get('/nextrec/:id', (req, res) => {
  const {id} = req.params
  getRecord('asc', id, res)
})

// SEARCH BY JOB NUMBER
app.get('/search/:value', async (req, res) => {
    const {value} = req.params

    let searchRes = []

    const index = await db.select('*').from('index')
    .where('jobnumber', value)
    searchRes[2] = index[0].type
    searchRes[3] = index[0].department
    searchRes[4] = index[0].requestedby

    const indexList = await db.select('jobnumber').from('index').orderBy('id', 'asc')
    searchRes[5] = indexList

    const issued = await db.select('*').from('issued').where('jobnumber', value).orderBy('id', 'asc')
    searchRes[0] = issued

    if (searchRes[2] === 'p') {
      const patientRecord = await db.select('*').from('patientjobs')
      .where('jobnumber', value)
      searchRes[1] = patientRecord[0]
    } else if (searchRes[2] === 't') {
      const techRecord = await db.select('*').from('techjobs')
      .where('jobnumber', value)
      searchRes[1] = techRecord[0]
    }

    res.json(searchRes)
})

// RETRIEVE ALL LISTS
app.get('/fetchFields', async (req, res) => {
  let dropDownContents = []

  const referrers = await db.select('*').from('referrer').orderBy('name', 'asc')
  const users = await db.select('*').from('users').orderBy('name', 'asc')
  const techTypes = await db.select('*').from('techtype')
  const departments = await db.select('*').from('departments')

  dropDownContents = [referrers, users, techTypes, departments]

  res.send(dropDownContents)
})

app.get('/getRecord', async (req, res) => {
    let dropDownContents = [];

    const previousJob = await db.select('*').from('index').orderBy('id', 'desc').limit(1)

    if (previousJob[0] !== undefined) {
        dropDownContents[4] = [
          previousJob[0].type, 
          previousJob[0].sequencenumber, 
          previousJob[0].day, 
          previousJob[0].department, 
          previousJob[0].jobnumber
        ]
    }

    const count = await db('index').count('id')
    dropDownContents[3] = count[0]

    const refs = await db.select('*').from('referrer').orderBy('name', 'asc')
    dropDownContents[0] = refs
    
    const users = await db.select('*').from('users').orderBy('name', 'asc')
    dropDownContents[1] = users

    const techtypes = await db.select('*').from('techtype')
    dropDownContents[7] = techtypes

    const departments = await db.select('*').from('departments')
    dropDownContents[8] = departments
    
    const patientjobs = await db.select('*').from('patientjobs').orderBy('id', 'desc').limit(1)
    dropDownContents[2] = patientjobs[0]

    const techjobs = await db.select('*').from('techjobs').orderBy('id', 'desc').limit(1)
    dropDownContents[5] = techjobs[0]

    const issuedList = await db.select('*').from('issued').where('jobnumber', dropDownContents[4][4]).orderBy('id', 'asc')
    dropDownContents[9] = issuedList

    res.send(dropDownContents)
})

app.post('/searchrecs', async (req, res) => {

    // if (req.body.type === 'p') {
        const { type, photographer, permission, hospitalNumber, patientSurname, patientForename, dateFrom, dateTo, designer, category, referrer, description, department } = req.body

    if (type === 'p') {
      const patientjob = await db('index')
        .join('patientjobs', 'index.jobnumber', '=', 'patientjobs.jobnumber')
        .select(db.raw('TO_CHAR("creationdate", \'DD-MM-YYYY\')'), 'index.id', 'index.jobnumber', 'index.department', 'index.requestedby', 'index.creationdate', 'patientjobs.photographer', 'patientjobs.hospitalnumber', 'patientjobs.patientsurname', 'patientjobs.patientforename', 'patientjobs.permission', 'patientjobs.description')
        .where('photographer', 'like', `%${photographer}%`)
        .where('permission', 'like', `%${permission}%`)
        .where('hospitalnumber', 'like', `%${hospitalNumber}%`)
        .where('patientsurname', 'ilike', `%${patientSurname}%`)
        .where('patientforename', 'ilike', `%${patientForename}%`)
        .where('index.requestedby', 'like', `%${referrer}%`)
        .where('description', 'ilike', `%${description}%`)
        .where('department', 'like', `%${department}%`)
        .where('creationdate', '>=', dateFrom)
        .where('creationdate', '<=', dateTo)

      res.json(patientjob)
    } else {
      const techjob = await db('index')
        .join('techjobs', 'index.jobnumber', '=', 'techjobs.jobnumber')
        .select(db.raw('TO_CHAR("creationdate", \'DD-MM-YYYY\')'), 'index.jobnumber', 'index.department', 'index.requestedby', 'index.creationdate', 'techjobs.category', 'techjobs.description', 'techjobs.designer')
        .where('designer', 'like', `%${designer}%`)
        .where('category', 'like', `%${category}%`)
        .where('index.requestedby', 'like', `%${referrer}%`)
        .where('description', 'ilike', `%${description}%`)
        .where('department', 'like', `%${department}%`)
        .where('creationdate', '>=', dateFrom)
        .where('creationdate', '<=', dateTo)

      res.json(techjob)
    }
})

const PORT = 3004

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
