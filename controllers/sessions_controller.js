const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const Client = require('../models/client.js')

sessions.get('/new', (req, res) => {
    res.render('sessions/new.ejs', {
        client : req.session.client
    })
})

sessions.post('/', (req, res) => {
    Client.findOne({username: req.body.username},
    (err, foundClient) => {
        if(err){
            console.log(err);
        }else if(!foundClient){
            res.send('<a  href="/">Sorry, no user found </a>')
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

sessions.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = sessions
