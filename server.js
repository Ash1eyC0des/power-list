// Dependencies
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config()
const { body, validationResult } = require('express-validator')

// DB variables
let db, 
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'power-list'

// MongoDB Connection
MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to ${dbName} database`)
        db = client.db(dbName)
    })

// Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())


// CRUD Methods
app.get('/', (req, res) => {
    db.collection('tasks').find().toArray()
        .then(data => {
            let taskList = data.map(x => x.name)
            console.log(taskList)
            res.render('index.ejs', {info: taskList})
        })
        .catch(err => console.log(err))
})

app.post(
    '/api', 
    body('name', 'Task cannot be blank').isLength({ min: 1}), 
    body('complete').toBoolean(),
    body('completedCount').toInt(),
    body('date').toDate(),
    (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        console.log(`Post heard`)
        db.collection('tasks').insertOne(
            req.body
        )
        .then(result => {
            console.log(result)
            res.redirect('/')
        })
        .catch(error => {
            console.log(error)
        })
})

// app.put('/updateEntry', (req, res) => {
//     console.log(req.body)
// })

app.delete('/deleteEntry', (req, res) => {
    db.collection('tasks').deleteOne(
        {name: req.body.name}
    )
    .then(results => {
        console.log(`Entry deleted`)
        res.json('Entry deleted')
    })
    .catch(error => console.error(error))
})

// Set up localhost on port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})