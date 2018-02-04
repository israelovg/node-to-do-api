//const MongoClient = require('mongodb').MongoClient;
//es6 object destructuting - we can init object properties this way - var {name}={name:'Gabi',age:34};
const { MongoClient,ObjectID } = require('mongodb');
MongoClient.connect('mongodb://localhost:27017/todoApp',(error, db) => {
    if (error) {
        return console.log('unable to connect mongodb Server.');
    }
    console.log("Succesfully connected to mongodb Server");

    //db.collection('todo').insertOne(
    //    { text: 'some thing to do more' ,completed:true},
    //    (err, result) => {
    //        if (err) {
    //            return console.log('unable to insert todo', err);
    //        }
    //        console.log(JSON.stringify(result.ops,undefined,2));
    //    }
    //);
    db.collection('users').insertOne(
        { name: 'Gabi', age: 38,location:"Holon ,Israel" },
        (err, result) => {
            if (err) {
                return console.log('unable to insert user', err);
            }
            //here we print object that inserted to mongo
            console.log(JSON.stringify(result.ops, undefined, 2));
            //id property that generated contains , timespam
            console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
        }
    );
    db.close();
});