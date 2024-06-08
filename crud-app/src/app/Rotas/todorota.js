const express = require('express');
const auth = require('../middleware/auth');
const Todo = require('../models/todo');

const router = new express.Router();

// Rota POST para criar uma nova tarefa
router.post('/todos', auth, async (req, res) => {
    const todo = new Todo({
        ...req.body,
        owner: req.user._id
    });

    try {
        await todo.save();
        res.status(201).send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota GET para ler todas as tarefas do usuário autenticado
router.get('/todos', auth, async (req, res) => {
    try {
        await req.user.populate('todos').execPopulate();
        res.send(req.user.todos);
    } catch (error) {
        res.status(500).send();
    }
});

// Rota PATCH para atualizar uma tarefa específica
router.patch('/todos/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed']; // substitua por seus próprios campos
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Atualizações inválidas!' });
    }

    try {
        const todo = await Todo.findOne({ _id: req.params.id, owner: req.user._id });

        if (!todo) {
            return res.status(404).send();
        }

        updates.forEach((update) => todo[update] = req.body[update]);
        await todo.save();
        res.send(todo);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Rota DELETE para excluir uma tarefa específica
router.delete('/todos/:id', auth, async (req, res) => {
    try {
        const todo = await Todo.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    } catch (error) {
        res.status(500).send();
    }
});

//tarefas sem dono
router.get('/todos/no-owner', async (req, res) => {
    try {
        const todos = await Todo.find({ owner: null });
        res.send(todos);
    } catch (error) {
        res.status(500).send();
    }
});

router.patch('/todos/:id/owner', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, { owner: req.body.owner }, { new: true });

        if (!todo) {
            return res.status(404).send();
        }

        res.send(todo);
    } catch (error) {
        res.status(500).send();
    }
});

module.exports = router;
