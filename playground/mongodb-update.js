
//const MongoClient = require('mongodb').MongoClient;
//es6 object destructuting - we can init object properties this way - var {name}={name:'Gabi',age:34};
const { MongoClient,ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoApp',(error, db) => {
    if (error) {
        return console.log('unable to connect mongodb Server.');
    }
    console.log("Succesfully connected to mongodb Server");
    db.collection("todo")
        .findOneAndUpdate(
            { _id: new ObjectID('5a6c9f25ab671e241c77f410') }, 
            { $set: { completed: false } },
            {returnOriginal:false}
    ).then((result) => {
            console.log(result);
    });

    db.collection("users")
        .findOneAndUpdate(
            { _id: new ObjectID('5a6ca002d19b9c5ee089f6cd') }, 
            { $set: { name: 'Gabi Israeli' },$inc:{age:2} },
            {returnOriginal:false}
        ).then((result) => {
            console.log(result);
        });
});