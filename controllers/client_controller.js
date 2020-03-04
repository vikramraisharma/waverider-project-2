const bcrypt = require('bcrypt')
const express = require('express')
const clients = express.Router()
const Client = require('../models/client.js')

clients.get('/new', (req, res) => {
    res.render('clients/new.ejs', {
        currentClient: req.session.currentClient
    })
})

clients.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
    Client.create(req.body, (err, createdClient) => {
        if(err){
            console.log(err);
        }else{
            console.log('client created: ', createdClient);
        }
        res.redirect('/')
    })
})

module.exports = clients
