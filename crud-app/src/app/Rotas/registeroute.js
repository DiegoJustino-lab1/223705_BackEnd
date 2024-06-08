const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Client = require('./models/Client'); // Certifique-se de que o caminho para o modelo do cliente está correto

router.post('/', async (req, res) => {
    const { nome, funcao } = req.body;

    try {
        // Verifique se o cliente já existe
        if (await Client.findOne({ email })) {
            return res.status(400).send({ error: 'Cliente já registrado' });
        }

        // Crie um novo cliente
        const client = new Client({ name, email, password: await bcrypt.hash(password, 10) });

        // Salve o cliente no banco de dados
        await client.save();

        res.status(201).send({ message: 'Cliente registrado com sucesso' });
    } catch (error) {
        res.status(500).send({ error: 'Erro ao registrar cliente' });
    }
});

module.exports = router;