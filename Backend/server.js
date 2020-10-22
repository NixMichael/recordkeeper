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


app.post('/newuser', (req,res) => {
    const { usertype, initials, name } = req.body

    db('users')
    .insert({
        initials: initials,
        name: name,
        usertype: usertype
    })
    .then(() => {
        db.select('*')
        .returning('*')
        .from('users')
        .then((newList) => {
            res.status(200).json(newList)
        })
    })
    .catch(err => console.log('Error', err))
})

app.post('/newreferrer', (req,res) => {
    const { initials, name } = req.body

    db('referrer')
    .insert({
        initials: initials,
        name: name
    })
    .then(() => {
        db.select('*')
        .returning('*')
        .from('referrer')
        .then((newList) => {
            res.status(200).json(newList)
        })
    })
    .catch(err => console.log('Error', err))
})

app.post('/newdepartment', (req,res) => {
    const { department } = req.body

    db('departments')
    .insert({
        departmentname: department,
        headofdepartment: ''
    })
    .then(() => {
        db.select('*')
        .returning('*')
        .from('departments')
        .then((newList) => {
            res.status(200).json(newList)
        })
    })
    .catch(err => console.log('Error', err))
})

app.post('/newcategory', (req,res) => {
    const { category, cost } = req.body

    db('techtype')
    .insert({
        type: category,
        techtypecost: cost
    })
    .then(() => {
        db.select('*')
        .returning('*')
        .from('techtype')
        .then((newList) => {
            res.status(200).json(newList)
        })
    })
    .catch(err => console.log('Error', err))
})

app.post('/', (req, res) => {
    const { seqNum, day, job, permission, requestedBy, department, hospitalNumber, patientSurname, patientForename, description, photographer, issues, type, category, designer} = req.body

    let countTotal;

    db('index')
    .insert({
        jobnumber: job,
        requestedby: requestedBy,
        type: type,
        sequencenumber: seqNum,
        day: day,
        department: department
    })
    .then(() => {
    db('index').count('id')
        .then(total => {
            countTotal = total[0].count
        })
    })
    .then(() => {
    type === 'p' ?
    db('patientjobs')
    .returning('*')
    .insert({
        jobnumber: job,
        permission: permission,
        hospitalnumber: hospitalNumber,
        patientsurname: patientSurname,
        patientforename: patientForename,
        description: description,
        photographer: photographer
    })
    .then(() => {
        res.send(countTotal)})
    :
    db('techjobs')
    .returning('*')
    .insert({
        jobnumber: job,
        category: category,
        description: description,
        quantity: 1,
        designer: designer
    })
    .then(() => {
        res.send(countTotal)})
    })

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

app.post('/addissued', (req,res) => {
    const { jobnumber, type, date, notes, qty, cost } = req.body

    db('issued')
    .insert({
        jobnumber: jobnumber,
        type: type,
        date: date,
        notes: notes,
        qty: qty,
        cost: cost
    })
    .then(() => {
        db('issued')
        .returning('*')
        .select('*')
        .where('jobnumber', jobnumber)
        .orderBy('id', 'asc')
        .then((updatedIssues) => {
            res.status(200).json(updatedIssues)
        })
        .catch(err => console.log('Error', err))
    })
})

app.delete('/deleteissued', (req,res) => {

    const {id, jobnumber} = req.body

    db('issued')
    .where('id', id)
    .del()
    .then(() => {
        db('issued')
        .returning('*')
        .select('*')
        .where('jobnumber', jobnumber)
        .orderBy('id', 'asc')
        .then(updatedIssues => {
            res.status(200).json(updatedIssues)
        })
        .catch(err => console.log(err))
    })
})

app.put('/editrecord', (req, res) => {

    const { job, permission, requestedBy, hospitalNumber, patientSurname, patientForename, description, photographer, department, type, category, designer} = req.body

    db('index')
    .where('jobnumber', job)
    .update({
        requestedby: requestedBy,
        department: department
    })
    .then(() => {
        type === 'p' ?
        db('patientjobs')
            .where('jobnumber', job)
            .update({
                permission: permission,
                hospitalnumber: hospitalNumber,
                patientsurname: patientSurname,
                patientforename: patientForename,
                description: description,
                photographer: photographer
            })
            .then(() => res.status(200).json('Success'))
            .catch(err => console.log('Error', err))
            :
                db('techjobs')
                .where('jobnumber', job)
                .update({
                    category: category,
                    description: description,
                    designer: designer
                })
                .then(() => res.status(200).json('Success'))
                .catch(err => console.log('Error', err))
    })
})

app.delete('/deleterecord', (req, res) => {
    const {job,recordType} = req.body

    db('index').where('jobnumber', job)
    .del()
    .then(() => {
        db('issued').where('jobnumber', job)
        .del()
        .then(() => {
            recordType === 'patientRecord' ?
            db.select('*').from('patientjobs').where('jobnumber', job)
            .del()
            .then(deleted => res.status(200).json(`Deleted: ${deleted}`))
            .catch(err => console.log(`Erroneous: ${err}`))
            :
            db.select('*').from('techjobs').where('jobnumber', job)
            .del()
            .then(deleted => res.status(200).json(`Deleted: ${deleted}`))
            .catch(err => console.log(`Erroneous: ${err}`))
        })
    })
})

app.delete('/deleteuser', (req,res) => {
    const { toDelete } = req.body

    for (c = 0; c < toDelete.length; c++) {
        db.select('*').from('users')
        .where('name', toDelete[c])
        .del()
        .then(() => {
            if (c === toDelete.length) {
                db.select('*').from('users')
                .then((list) => {
                    res.send(list)
                })
            }
        })
    }
})

app.delete('/deletereferrer', (req,res) => {
    const { toDelete } = req.body

    for (c = 0; c < toDelete.length; c++) {
        db.select('*').from('referrer')
        .where('name', toDelete[c])
        .del()
        .then(() => {
            if (c === toDelete.length) {
                db.select('*').from('referrer')
                .then((list) => {
                    res.send(list)
                })
            }
        })
    }
})

app.delete('/deletedepartment', (req,res) => {
    const { toDelete } = req.body

    for (c = 0; c < toDelete.length; c++) {
        db.select('*').from('departments')
        .where('departmentname', toDelete[c])
        .del()
        .then(() => {
            if (c === toDelete.length) {
                db.select('*').from('departments')
                .then((list) => {
                    res.send(list)
                })
            }
        })
    }
})

app.delete('/deletecategory', (req, res) => {
    const { toDelete } = req.body

    for (c = 0; c < toDelete.length; c++) {
        db.select('*').from('techtype')
        .where('type', toDelete[c])
        .del()
        .then(() => {
            if (c === toDelete.length) {
                db.select('*').from('techtype')
                .then((list) => {
                    res.send(list)
                })
            }
        })
    }
})

app.get('/gettechcost/:cat', (req, res) => {
    const {cat} = req.params

    db.select('techtypecost')
    .from('techtype')
    .where('type', cat)
    .then(techtypecost => {
        res.json(techtypecost[0].techtypecost)
    })
})

// FUNCTION TO FETCH A RECORD. CALLED FROM ALL RECORD FETCH ROUTES
const getIndex = async (order, id, res) => {

  const recId = id === 0 ? 1 : 100
  let data = []
  let jobNum

  const lastRec = await db.select('*').from('index')
  .orderBy('id', order)
  .limit(recId)
  console.log(id, lastRec[id].department)
  data[3] = lastRec[id].department
  data[4] = lastRec[id].requestedby
  jobNum = lastRec[id].jobnumber
  
  if (lastRec[0].type === 't') {
    const result = await db.select('*').from('techjobs').where('jobnumber', jobNum)
    data[0] = 't'
    data[1] = result[0]
  } else if (lastRec[0].type === 'p') {
    const result = await db.select('*').from('patientjobs').where('jobnumber', jobNum)
    data[0] = 'p'
    data[1] = result[0]
  }

  const issued = await db('issued').where('jobnumber', jobNum).orderBy('id', 'asc').select('*')
  data[2] = issued[0]

  const count = await db('index').count('id')
  data[5] = count[0].count

  res.send(data)
}

// Fetch Record routes
app.get('/firstrec/:id', (req, res) => {
  const { id } = req.params
  getIndex('asc', id, res)
})

app.get('/lastrec/:id', (req, res) => {
  const { id } = req.params
  getIndex('desc', id, res)
})

app.get('/nextrec/:id', (req, res) => {
  console.log('triggered')
  const {id} = req.params
  console.log(id)
  getIndex('asc', id, res)
  // let data = []

  // db.select('*').from('index')
  // .orderBy('id', 'asc')
  // .then(job => {
  //     data[3] = job[id].department
  //     job[id].type === 'p' ?
  //         db('patientjobs')
  //         .where('jobnumber', job[id].jobnumber)
  //         .select('*')
  //         .then(patientJob => {
  //             data[0] = 'p'
  //             data[1] = patientJob[0]
  //         })
  //         :
  //         db('techjobs')
  //         .where('jobnumber', job[id].jobnumber)
  //         .select('*')
  //         .then(techJob => {
  //             data[0] = 't'
  //             data[1] = techJob[0]
  //         })

  //         db('issued')
  //         .where('jobnumber', job[id].jobnumber)
  //         .orderBy('id', 'asc')
  //         .select('*')
  //         .then(issueDetails => {
  //             data[2] = issueDetails
  //         })
  //         .then(() => {
  //             res.send(data)
  //         })
  // })
})

app.get('/search/:value', (req, res) => {
    const {value} = req.params

    let searchRes = []

    db.select('*').from('index')
    .where('jobnumber', value)
    .then((result) => {
        if (result.length > 0) {
            searchRes[2] = result[0].type
            searchRes[3] = result[0].department
        }
    })

    db.select('*').from('issued')
    .where('jobnumber', value)
    .orderBy('id', 'asc')
    .then((result) => {
        searchRes[0] = result.length > 0 && result[0]
    })
    .then(() => {
        searchRes[2] === 'p' ?
        db.select('*').from('patientjobs')
        .where('jobnumber', value)
        .then(record => {
            searchRes[1] = record[0]
            res.json(searchRes)
        })
        .catch(console.log)
        :
        db.select('*').from('techjobs')
        .where('jobnumber', value)
        .then(record => {
            searchRes[1] = record[0]
            res.json(searchRes)
        })
        .catch(console.log)
    })
})

app.get('/fetchFields', (req, res) => {
  let dropDownContents = []

  const getFields = async () => {
    const referrer = await db.select('*').from('referrer').orderBy('name', 'asc')
    const users = await db.select('*').from('users').orderBy('name', 'asc')
    const techTypes = await db.select('*').from('techtype')
    const departments = await db.select('*').from('departments')

    dropDownContents = [referrer, users, techTypes, departments]

    res.send(dropDownContents)
  }

  getFields()
})

app.get('/getRecord', (req, res) => {
    let dropDownContents = [];

    db.select('*').from('index')
    .orderBy('id', 'desc').limit(1)
    .then(previousJob => {
        if (previousJob[0] !== undefined) {
            dropDownContents[4] = [previousJob[0].type, previousJob[0].sequencenumber, previousJob[0].day, previousJob[0].department, previousJob[0].jobnumber]
        }
    })
    .then(() => {
    db('index').count('id')
    .then(count => {
        dropDownContents[3] = count[0]
    })

    db.select('*').from('referrer')
    .orderBy('name', 'asc')
    .then(refs => {
        dropDownContents[0] = refs
    })
    
    db.select('*').from('users')
    .orderBy('name', 'asc')
    .then(users => {
        dropDownContents[1] = users
    })

    db.select('*').from('techtype')
    .then(techtypes => {
        dropDownContents[7] = techtypes
    })

    db.select('*').from('departments')
    .then(departments => {
      dropDownContents[8] = departments
    })
    
    db.select('*').from('patientjobs')
    .orderBy('id', 'desc').limit(1)
    .then(job => {
      dropDownContents[2] = job[0]
    })

    db.select('*').from('techjobs')
    .orderBy('id', 'desc').limit(1)
    .then(job => {
        dropDownContents[5] = job[0]
    })
    db.select('*').from('issued')
    .where('jobnumber', dropDownContents[4][4])
    .orderBy('id', 'asc')
    .then(issuedList => {
        dropDownContents[9] = issuedList
    })
    .then(() => {
        res.send(dropDownContents)
    })
    })
})

app.post('/searchrecs', (req, res) => {

    // if (req.body.type === 'p') {
        const { type, photographer, permission, hospitalNumber, patientSurname, patientForename, dateFrom, dateTo, designer, category, referrer, description, department } = req.body
    // } else {
    //     const { designer, category, referrer, description } = req.body
    // }

    let arr = []

    
    if (type === 'p') {
        db('index')
        .join('patientjobs', 'index.jobnumber', '=', 'patientjobs.jobnumber')
        .select(db.raw('TO_CHAR("creationdate", \'DD-MM-YYYY\')'), 'index.jobnumber', 'index.department', 'index.requestedby', 'index.creationdate', 'patientjobs.photographer', 'patientjobs.hospitalnumber', 'patientjobs.patientsurname', 'patientjobs.patientforename', 'patientjobs.permission', 'patientjobs.description')
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
        .then(results => {
            res.json(results)
        })
        .catch(console.log)
    } else {
        db('index')
        .join('techjobs', 'index.jobnumber', '=', 'techjobs.jobnumber')
        .select(db.raw('TO_CHAR("creationdate", \'DD-MM-YYYY\')'), 'index.jobnumber', 'index.department', 'index.requestedby', 'index.creationdate', 'techjobs.category', 'techjobs.description', 'techjobs.designer')
        .where('designer', 'like', `%${designer}%`)
        .where('category', 'like', `%${category}%`)
        .where('index.requestedby', 'like', `%${referrer}%`)
        .where('description', 'ilike', `%${description}%`)
        .where('department', 'like', `%${department}%`)
        .where('creationdate', '>=', dateFrom)
        .where('creationdate', '<=', dateTo)
        .then(results => {
            res.json(results)
        })
        .catch(console.log)
    }
})

app.listen(3004, () => {
    console.log('Listening on port 3004')
})
