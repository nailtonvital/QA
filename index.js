const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const connection = require('./database/database')
const question = require("./database/Question")
const answers = require("./database/Answers")

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

app.get('/question/:id', (req,res)=>{
    const {id} = req.params
    
    question.findOne({
        where: {id: id}
    })
    .then(question=>{
        if(question != undefined){
            answers.findAll({
                where: {
                    questionid: id
                },
                order: [['id','DESC']]
            }).then(data=>{
                res.render('question-page', {
                    question: question,
                    answers: data,
                })
            })
            
        }else{
            res.redirect('/')
        }
    })
})

app.post("/reply", (req,res)=>{
    const body = req.body.body
    const { question } = req.body

    answers.create({
        body: body,
        questionid: question ,
    }).then(()=>{
        res.redirect("/question/"+question)
    })
})


app.listen(8080, ()=>{
    console.log("servidor rodando na porta 8080")
})