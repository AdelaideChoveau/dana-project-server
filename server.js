require('dotenv').config()

const MongoClient = require('mongodb').MongoClient
const express = require('express');
const bodyParser= require('body-parser');
const app = express();


  // Make sure you place body-parser before your CRUD handlers!
  app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true })
.then(client => {
  console.log('Connected to Database')
  const db = client.db('dana-associations-project')
  const quotesCollection = db.collection('quotes')
  

  // app.use(/* ... */)
  // app.get(/* ... */)


  app.post('/quotes', (req, res) => {
      console.log(req)
    quotesCollection.insertOne(req.body)
      .then(result => {
        res.status(200).send('OK')
        console.log(result)
      })
      .catch(error => console.error(error))
  })

  // app.listen(/* ... */)

})
.catch(console.error)



// All your handlers here...
app.listen(3100, function() {
    console.log('listening on 3100')
  })

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.post('/quotes', (req, res) => {
    console.log(req.body)
  })