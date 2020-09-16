const express = require('express')
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const autheticate = require('./model/authenticate')

var app = express()
app.use(bodyParser.json())

app.post('/signup', async function(req, res){
    var salt = await bcrypt.genSalt()
    console.log(salt)
    var password = await bcrypt.hash(req.body.password, salt)
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
            res.send('Success')
        } else{
            res.send('not allowed')
        }
    }
    catch{
        res.status(500).send('got some error')
    }
})


app.listen(9000, ()=> console.log("server is running"))