
//const MongoClient = require('mongodb').MongoClient;
//es6 object destructuting - we can init object properties this way - var {name}={name:'Gabi',age:34};
const { MongoClient,ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoApp',(error, db) => {
    if (error) {
        return console.log('unable to connect mongodb Server.');
    }
    console.log("Succesfully connected to mongodb Server");
    //deleteMany
    //db.collection("todo").deleteMany({ text: 'Eat lunch' }).then((result) => {
    //    console.log(result);
    //});

    //deleteOne
    //db.collection('todo').deleteOne({ text: 'Eat lunch' }).then((result) => {
    //    console.log(result);
    //});

    //findeOneAndDelete
    db.collection('todo').findOneAndDelete({ text: 'Eat lunch' }).then((result) => {
        console.log(result);
    });
});