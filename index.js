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

// app.post("/login", async (req, res) =>{
//     if(await autheticate.find){

//     }
// })


app.listen(9000, ()=> console.log("server is running"))