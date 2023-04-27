const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    }
});

const Todo = mongoose.model('todo', todoSchema);

exports.Todo = Todo;