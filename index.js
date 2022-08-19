const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const connection = require('./database/database')
const question = require("./database/Question")

connection
    .authenticate()
    .then(()=>{
        console.log("conexão feita com sucesso")
    })
    .catch((err)=>{
        console.log(err)
    })

app.set('view engine','ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    question.findAll({raw: true, order:[
        ['id', 'DESC']
    ]}).then(data=>{
        console.log(data)
        res.render('index',{
            questions: data
        })
    })
})

app.get("/question", (req, res) => {
    res.render('question')
})

app.post("/makequestion", (req, res) => {
    const { title } = req.body
    const { description}  = req.body 
    
    question.create({
        title: title,
        description: description,
    }).then(()=>{
        res.redirect('/')
    })
})


app.listen(8080, ()=>{
    console.log("servidor rodando na porta 8080")
})