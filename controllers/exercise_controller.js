const express = require('express')
const Exercise = require('../models/exercise.js')
const exercises = express.Router()



//presentational routes

//new
exercises.get('/new', (req, res) => {
    res.render('exercises/new.ejs', {
        currentClient: req.session.currentClient
    })
})


//edit
exercises.get('/:id/edit', (req, res) => {
    Exercise.findById(req.params.id, (err, foundExercise) => {
        res.render('exercises/edit.ejs', {
            exercise: foundExercise,
            currentClient: req.session.currentClient
        })
    })
})

//show
exercises.get('/:id', (req, res) => {
    Exercise.findById(req.params.id, (err, foundExercise) => {
        res.render('exercises/show.ejs', {
            exercise: foundExercise,
            currentClient: req.session.currentClient
        })
    })
})


//index
exercises.get('/', (req, res) => {
    Exercise.find({}, (err, allExercises) => {
        res.render('exercises/index.ejs', {
            exercises: allExercises,
            currentClient: req.session.currentClient
        })
    })
})

//seed
exercises.get('/setup/seed', (req, res) => {
    Exercise.create(
        [
            {
                name: 'Squat',
                description: 'An exercise mainly targeting the legs and posterior chain that tests your core stability. Advance variations include: Front squat, Low-bar squat, and Hatfield squat.',
                muscleGroup: 'Legs, Posterior Chain, Core',
                isHard: true
            },
            {
                name: 'Overhead Press',
                description: `A barbell movement  starting with the bar in a front rack position and pressing upwards until full arm extension.`,
                muscleGroup: 'Pectorals, Deltoids, Triceps, Trapezius',
                isHard: true
            },
            {
                name: 'Seal Row',
                description: 'A barbell movement that starts with the client laying on the seal row table, and ends with the client pulling the bar up towards their chest.',
                muscleGroup: 'Lats, Rhomboids, Rear Deltoids, Biceps, Trapezius',
                isHard: false
            },

        ]
    )
})

//functional routes
//delete
exercises.delete('/:id', (req, res) => {
    Exercise.findByIdAndRemove(req.params.id, (err, foundExercise) => {
        res.redirect('/exercises')
    })
})

//update
exercises.put('/:id', (req, res) => {
    Exercise.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true},
        (error, updatedExercise) => {
            res.redirect('/exercises')
        }
    )
})

//create
exercises.post('/', (req, res) => {
    if(req.body.isHard === 'on'){
        req.body.isHard = true
    }else{
        req.body.isHard = false
    }
    Exercise.create(req.body, (err, createdExercise) => {
        res.redirect('/exercises')
    })
})

//export
module.exports = exercises
