const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');
const { ObjectId } = require('mongodb');

//var id = '5a9ae49f306bf960a8c2b7e6';
//if (!ObjectId.isValid(id)) {
//    console.log('Id is not valid');
//}
//Todo.find({ _id: id }).then((todos) => {
//    console.log("Todos", todos);
//});

//Todo.findOne({ _id: id }).then((todo) => {
//    console.log("Todo", todo);
//});

//Todo.findById(id).then((todo) => {
//    console.log("Todo find by Id", todo);
//}).catch((err) => {
//    console.log('Error Occured',err);
//});
var id = '5a867ca7c90ae64c803fe2ef';
if (!ObjectId.isValid(id)) {
    console.log('User Id not valid');
}
User.findById(id).then((user) => {
    if (!user) {
        console.log('user not found');
    }
    console.log(JSON.stringify(user,null,2));
}).catch((err) => {
    console.log("Error occured", err);
})