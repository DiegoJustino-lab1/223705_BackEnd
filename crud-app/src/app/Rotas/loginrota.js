const express = require('express');
const router = express.Router();
const auth = require('../Midleware/auth'); 
router.put('/rota', function(req, res) {

// Rota PUT para atualizar um usuário
router.put('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'age']; 
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();

        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota POST para criar um novo usuário
router.post('/', auth, async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota DELETE autenticada para excluir um usuário
router.delete('/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
});

// Rota GET para obter a quantidade de usuários por função
router.get('/countByRole', auth, async (req, res) => {
    try {
        const feEngineers = await User.countDocuments({ role: 'Engenheiro de FE' });
        const beEngineers = await User.countDocuments({ role: 'Engenheiro de BE' });
        const dataAnalysts = await User.countDocuments({ role: 'Analista de dados' });
        const techLeads = await User.countDocuments({ role: 'Líder Técnico' });

        res.send({
            'Engenheiro de FE': feEngineers,
            'Engenheiro de BE': beEngineers,
            'Analista de dados': dataAnalysts,
            'Líder Técnico': techLeads
        });
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
});