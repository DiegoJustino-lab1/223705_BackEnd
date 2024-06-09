const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // Isso pressupõe que você tem um modelo User
    }
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;