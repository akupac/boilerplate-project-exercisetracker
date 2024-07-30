const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

let userModel = require('./userModel');
let exerciseModel = require('./exerciseModel');

mongoose.connect(process.env.MONGO_URI);

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(cors())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.route('/api/users').post(async function (req, res) {
  //# TODO:You can POST to /api/users with form data username to create a new user.
  // # TODO:The returned response from POST /api/users with form data username will be an object with username and _id properties.

  try {
    await userModel.create({
      username: req.body.username
    }).then((user) => {
      console.info(`User ${user.username} added successfully`)
      return res.status(200).json(user)
    })
  } catch (error) {
    console.error(error)
  }
}).get(async function (req, res) {
  // # TODO:You can make a GET request to /api/users to get a list of all users.
  // # TODO:The GET request to /api/users returns an array.
  // # TODO:Each element in the array returned from GET /api/users is an object literal containing a user's username and _id.

  try {
    await userModel.find().then((users) => {
      return res.status(200).json(users)
    })
  } catch (error) {
    console.error(error)
  }


})
/*
# TODO:You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
# TODO:The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.
# TODO: não usar create(), usar update() ou push() no lugar
*/
app.post('/api/users/:_id/exercises', async function (req, res) {
  try {

    //let user = await userModel.findById(req.params._id);


    await exerciseModel.create({
      description: req.body.description,
      duration: req.body.duration,
      date: req.body.date  
      })
      .then(async (exercise) => {
        console.debug(exercise)
        await userModel.findByIdAndUpdate(req.params._id, {
          log: [exercise],
        })
        await userModel.findByIdAndUpdate(req.params._id, {
          $push: {log: exercise},
        })
        //await userModel.log.push(exercise)
        return res.status(200).json(exercise)
        
      })
  } catch (error) {
    console.error(error)
  }
})
/*
# TODO:You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
# TODO:A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.
# TODO:A GET request to /api/users/:_id/logs will return the user object with a log array of all the exercises added.
# TODO:Each item in the log array that is returned from GET /api/users/:_id/logs is an object that should have a description, duration, and date properties.
# TODO:The description property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string.
# TODO:The duration property of any object in the log array that is returned from GET /api/users/:_id/logs should be a number.
# TODO:The date property of any object in the log array that is returned from GET /api/users/:_id/logs should be a string. Use the dateString format of the Date API.
# TODO:You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.
*/



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})