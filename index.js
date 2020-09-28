const cors = require('cors')
const express = require('express')
const nodemailer = require('nodemailer')

const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())


let smtp_login = process.env.LOGIN || ''
let smtp_password = process.env.PASS || ''
let PORT = process.env.PORT || '3010'

app.get('/', function (req, res) {
    res.send('oke')
})
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: smtp_login, // generated ethereal user
        pass: smtp_password, // generated ethereal password
    },
})

app.put('/sendMessage', async function (req, res) {
    let info = await transporter.sendMail({
        from: 'My profile page', // sender address
        to: 'craftwaymiks@gmail.com', // list of receivers
        subject: req.body.name, // Subject line
        html: `<div>сообщение с вашего портфолио :
                <div>name ${req.body.name}</div>
                <div>email ${req.body.email}</div>
                 <div>text ${req.body.text}</div> 
                 </div>`
    })

    res.send(req.body)
})

app.listen(PORT, function () {
    console.log('server start 3010 port')
})
