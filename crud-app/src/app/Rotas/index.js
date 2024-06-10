const mongoose = require('mongoose');
const express = require("express");
const app = express();
const port = 3000;
const loginRouter = require('./loginrota');
const registerRouter = require('./registeroute'); 
const todoRouter = require('./todorota');

// Definição do modelo Funcionario
const Funcionario = require('../models/funcionario');

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://AC2PROJECT:AC2PROJECT@ac2project.miulncj.mongodb.net/?retryWrites=true&w=majority&appName=AC2PROJECT', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Middleware para analisar JSON
app.use(express.json());

// Rota principal
app.get("/", (req, res) => {
  console.log("Root route called");
  res.send("Bem-vindo ao CRUD API");
});

// Rota para criar um novo funcionário
app.post("/", async (req, res) => {
    try {
        const funcionario = new Funcionario({
            nome: req.body.nome,
            funcao: req.body.funcao
        });
        await funcionario.save();
        res.send(funcionario);
    } catch (err) {
        res.status(500).send({ error: 'Erro ao criar funcionário' });
    }
});

app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/todos', todoRouter);

const caminhoRouter = express.Router();

caminhoRouter.get('/', function(req, res, next) {
  res.send('Você acessou o caminho /caminho');

});

app.use('/caminho', caminhoRouter);

// Inicializar o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}).on('error', err => {
    console.error('Erro ao iniciar o servidor:', err);
});
