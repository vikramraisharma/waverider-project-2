const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const Client = require('../models/client.js')
// const Trainer = require('../models/trainer.js')
// const Account = require('../models/accounts.js')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        account : req.session.account
    })
})
// sessions.get('/new-trainer', (req, res) => {
//     res.render('sessions/new-trainer.ejs', {
//         trainer: req.session.trainer
//     })
// })

sessions.post('/', (req, res) => {
    Client.findOne({username: req.body.username},
    (err, foundClient) => {
        if(err){
            console.log(err);
        }else if(!foundClient){
            res.send('<a  href="/">Sorry, no client found </a>')
        }else{
            if(bcrypt.compareSync(req.body.password, foundClient.password)){
                req.session.currentClient = foundClient
                res.redirect('/')
            }else{
                res.send('<a href="/"> password does not match </a>')
            }
        }
    })
})

// sessions.post('/', (req, res) => {
//     Trainer.findOne({username: req.body.username},
//     (err, foundTrainer) => {
//         if(err){
//             console.log(err);
//         }else if(!foundTrainer){
//             res.send('<a  href="/">Sorry, no trainer found </a>')
//         }else{
//             if(bcrypt.compareSync(req.body.password, foundTrainer.password)){
//                 req.session.currentTrainer = foundTrainer
//                 res.redirect('/')
//             }else{
//                 res.send('<a href="/"> password does not match </a>')
//             }
//         }
//     })
// })


sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessions
