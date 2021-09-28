const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key')
const { User } = require("./models/User")

// application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))

// application/json
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/register', (req, res) => {

  // get information for registering from client, then put into the database
  const user = new User(req.body)
  user.save((err, userInfo) => {
    if(err) return res.json({ success: false, err })
    return res.status(200).json({
      success: true
    })
  })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))