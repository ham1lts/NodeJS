const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta")
//Database

connection
.authenticate()
.then(() => {
    console.log("Conectado")
})
.catch((msgErro) =>{
    console.log("Erro")
})

// Definindo EJS como view Engine
app.set('view engine', 'ejs')
app.use(express.static('public'));

// Implementando bodyparser 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
    Pergunta.findAll({raw:true,order:[['id','DESC']]}).then(perguntas=>{
        res.render("index",{
            perguntas: perguntas
        }); // não precisa especificar o caminho ele já olha para a pasta views
        
    });
});


app.get("/perguntar",(req,res)=>{
    res.render("ask")
})


app.post("/salvarpergunta",(req,res)=>{ // redirecionamento do formulário
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
        Pergunta.create({
            titulo: titulo,
            descricao: descricao
        }).then(()=>{
            res.redirect("/")
        });
});

app.get("/pergunta/:id",(req,res) => {
    let id = req.params.id
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta => {
        if(pergunta != undefined){
            res.render("askOne",{
                pergunta : pergunta});
        }else{
            res.redirect("/")
        }
    })
});


app.listen(8080,()=>{
    console.log("Site Rodando!")
})