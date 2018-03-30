const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const { ObjectId } = require('mongodb');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });

Todo.findByIdAndRemove("5ab15c8b737149bac5bbb683").then((todo)=>{
    console.log(todo);
});

Todo.findOneAndRemove({_id:"5ab15c8b737149bac5bbb683"}).then((todo)=>{
    console.log(todo);
});
