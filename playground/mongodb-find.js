//const MongoClient = require('mongodb').MongoClient;
//es6 object destructuting - we can init object properties this way - var {name}={name:'Gabi',age:34};
const { MongoClient,ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoApp',(error, db) => {
    if (error) {
        return console.log('unable to connect mongodb Server.');
    }
    console.log("Succesfully connected to mongodb Server");

    //db.collection('todo').find({
    //    _id:new ObjectID("5a6c9ef3c0b4c334381d76c1") // we can query results by 
    //}).toArray().then((docs) => {
    //    console.log("todo");
    //    console.log(JSON.stringify(docs,undefined,2));
    //} ,(err) => {
    //    console.log("can't fetch todo", error);
    //});

    db.collection('users').find({name:"Gabi"}).count().then((count) => {
        console.log(`users count:${count}`);    
    } ,(err) => {
        console.log("can't fetch users", error);
    });
    // db.close();
});