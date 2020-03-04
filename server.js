//dependencies
const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const session = require('express-session')

//config
require('dotenv').config()
const app = express()
const db = mongoose.connection
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

//middleware
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(express.static('public'))

//database
mongoose.connect(
    mongodbURI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    },
    () => {
        console.log('The connection is set to: ', mongodbURI);
    }
)

//controllers
const exerciseController = require('./controllers/exercise_controller.js')
app.use('/exercises', exerciseController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)
const clientController = require('./controllers/client_controller.js')
app.use('/clients', clientController)
// const trainerController = require('./controllers/trainer_controller.js')
// app.use('/trainers', trainerController)
// const accountsController = require('./controllers/accounts_controller.js')
// app.use('/accounts', accountsController)

//routes
app.get('/', (req, res) => {
    res.redirect('/exercises')
})
//listener
app.listen(PORT, () => {
    console.log('listening on port: ', PORT);
})
