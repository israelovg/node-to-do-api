var express = require('express');
var bodyParser = require('body-parser');

var mongoose = require("./db/mongoose");
var { Todo } = require('./models/todo');
var { User } = require('./models/user');
const { ObjectId } = require('mongodb');

var app = express();
var port=process.env.PORT ||  3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });
    todo.save().then((doc) => {
        res.send(doc);
    },
        (error) => {
            res.status(400).send(error);
        });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    },
        (error) => res.status(400).send(error));
});

// GET/todos/id
app.get('/todos/:id', (req, res) => {
    if (! ObjectId.isValid(req.params.id)) {
       return   res.status(404).send();
    }

    Todo.findById(req.params.id).then((todo) => {
        if (!todo) {
          return  res.status(404).send();
        }
         
        res.send({todo});
    },
        (error) => {
            res.status(400).send(error);
        });
});
app.delete("/todo/:id",(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
    {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(req.params.id).then((todo)=>{
      if(!todo){
        return res.status(404).send();
      }
      res.send({todo});
    },(error)=>{
        res.status(400).send(error);
    });
});
app.listen(port,
    () => {
        console.log(`Started on port ${port} node-todo-api/server`);
    });
module.exports = app;