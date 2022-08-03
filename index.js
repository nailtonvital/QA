const express = require('express')
const app = express()

app.set('view engine','ejs')
app.set(express.static("public"))

app.get("/",(req,res)=>{
    res.render('index')
})

app.get("/question", (req, res) => {
    res.render('question')
})

app.listen(8080, ()=>{
    console.log("blbA")
})