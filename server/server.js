const _=require('lodash');
const express = require('express');
const bodyParser = require('body-parser');

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
app.delete("/todos/:id",(req,res)=>{
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
app.patch("/todos/:id",(req,res)=>{
    var id=req.params.id;
    if(!ObjectId.isValid(id))
    {
        return res.status(404).send();
    }
    //we retreave only spesific params from body
    var body=_.pick(req.body,['text','completed']);
    console.log(body);
    if(_.isBoolean(body.completed) && body.completed)
    {
       body.completedAt=new Date().getTime();
    }
    else
    {
      body.completed=false;
      body.completedAt=null;
    }
    Todo.findByIdAndUpdate(id,body,{new:true}).then((todo)=>{
        if(!todo)
        {
            return res.status(404);
        }
        res.send({todo});
    }).catch((error)=>res.status(404).send());
    
});
app.listen(port,
    () => {
        console.log(`Started on port ${port} node-todo-api/server`);
    });
module.exports = app;