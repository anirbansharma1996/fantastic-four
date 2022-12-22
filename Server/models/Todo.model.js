
const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    taskname : String,
    status : String,
    tag : String,
    userID: String,
// taskname - Take haircut,
// status - pending,
// tag - personal
})

const TodoModel = mongoose.model("todos",todoSchema);

module.exports = {TodoModel}