const mongoose = require('mongoose');

const express = require("express");
const app = express();
const port = 3000;

const loginRouter = require('./loginrota'); // Importe o roteador de login


app.use(express.json()); // Adicione isso para permitir que o Express analise o corpo das solicitações POST
app.use('/login', loginRouter); // Use o roteador de login na rota '/login'
app.use('/register', registerRouter); // Use o roteador de registro na rota '/register'




app.get("/", (req, res) => {
    res.send("Hello World!");
    })
    mongoose.connect('mongodb+srv://AC2PROJECT:AC2PROJECT@ac2project.miulncj.mongodb.net/?retryWrites=true&w=majority&appName=AC2PROJECT');


const Funcionario= mongoose.model('Funcionario', {
    nome: String,
    funcao: String
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    })

    app.post("/",async  (req, res) => {
        const funcionario = new Funcionario({
            nome: req.body.nome,
            funcao: req.body.funcao
        })
       await funcionario.save()
       res.send(funcionario)
    })

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    })