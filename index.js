const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const autheticate = require('./model/authenticate')
const jwt = require('jsonwebtoken')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const secret = require('./config/secret')

var app = express()
app.use(bodyParser.json())

app.post('/signup', async function(req, res){
    var password = await bcrypt.hash(req.body.password, 10)
    var username = req.body.username
    await autheticate.create({
        username,
        password
    }).then(result => console.log(result))
    res.status(200).send()
})

app.post("/login", async function(req, res){
    var user = await autheticate.findOne({where: {username : req.body.username}})
    if(user==null)
    {
        res.status(400).send('can not find user')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)) 
        {
            var token = jwt.sign({
                username: req.body.username
            }, secret.jwt_secret,{
                expiresIn: "1h"
            })
            res.status(200).send({
                "token": token})
        } else{
            res.send('not allowed')
        }
    }
    catch{
        res.status(500).send('got some error')
    }
})

app.post('/check', jwtMiddleware, (req, res) => {
    res.send("Hello How are you")
})


app.listen(9000, ()=> console.log("server is running"))