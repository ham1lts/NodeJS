const sequelize = require("sequelize");
const connection = require("./database");

//DEFININDO OS CAMPOS
const Pergunta = connection.define('pergunta',{
    titulo:{
        type: sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{}) // CRIAR A TABELA, CASO JÁ EXISTA NÃO FORÇA A CRIAÇÃO
module.exports = Pergunta;