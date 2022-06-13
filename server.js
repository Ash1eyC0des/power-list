// Dependencies
const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 8000
require('dotenv').config() 

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
    let contents = db.collection('').find().toArray()
        .then(data => {
            let taskList = data.map(x => x.title)
            console.log(taskList)
            res.render('index.ejs', {info: taskList})
        })
        .catch(err => console.log(err))
})

app.post('/api', (req, res) => {

})

app.put('updateEntry', (req, res) => {

})

app.delete('/deleteEntry', (req, res) => {

})

// Set up localhost on port
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`)
})