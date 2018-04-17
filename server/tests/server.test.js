var expect = require('expect');
const request = require('supertest');
const {ObjectId}=require('mongodb');

const app = require('./../server');
const {Todo} = require('./../models/todo');

const todos = 
[{ text: "First test todo",
   _id:new ObjectId() 
 },
 { text: "Second test todo",
  _id:new ObjectId(),
  completed:true,
  completedAt:333
 }];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() =>done());
});

describe('Post /todos', () => {
    it('should create new a new todo', (done) => {
        var text = 'test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {

                    return done(err);
                }

                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();

                }).catch((e) => done(e));
            });
    });
    it('should not create todo with invalid body', (done) => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {

                    return done(err);
                }

                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe("Get /todos", () => {
    it('should get all todos',
        (done) => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect((res) => {
                    expect(res.body.todos.length).toBe(2);
                })
                .end(done);
        });
});

describe('GET /todos:id',()=>{
    it('should get todo by id',(done)=>{
        console.log(`/todos/${todos[0]._id.toHexString()}`);
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);

    });
    
    it('should return 404 if id not found',(done)=>{
        request(app)
        .get(`/todos/${new ObjectId().toHexString()}`)
        .expect(404)
        .end(done);
    });
    
    it('should return 404 if id not valid',(done)=>{
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});
describe('DELETE /todos/:id',()=>{
    it('should remove a todo',(done)=>{
       var hexId=todos[0]._id.toHexString();
       request(app)
       .delete(`/todos/${hexId}`)
       .expect(200)
       .expect((res)=>{
           expect(res.body.todo._id).toBe(hexId);
       })
       .end((err,res)=>{
           if(err)
           {
               return done(err);
           }

           Todo.findById(hexId).then((todo)=>{
                expect(todo).toBeNull();
                done();
            })
            .catch((e)=>done(e));
       });
       
    });
    it('should return 404 if todo not found',(done)=>{
        var hexId=new ObjectId().toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(404)
        .end(done);
    });
    it('should return 404 if object id is not valid',(done)=>{
        request(app)
        .delete(`/todos/123`)
        .expect(404)
        .end(done);
    });
});
describe("PATCH /todos/:id",()=>{
    it("should update todo is completed",(done)=>{
        var text="update comleted to true";
        request(app)
        .patch(`/todos/${todos[0]._id.toHexString()}`)
        .send({text,completed:true})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe("number");
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
         done();
        });

    });
    it("should update todo is not completed",(done)=>{
        var text="update comleted to false";
        request(app)
        .patch(`/todos/${todos[1]._id.toHexString()}`)
        .send({text,completed:false})
        .expect(200)
        .expect((res)=>{
            expect(res.body.todo.text).toBe(text,"text is not equal");
            expect(res.body.todo.completed).toBe(false,"text is not equal");
            expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end((err,res)=>{
            if(err)
            {
                return done(err);
            }
         done();
        });
    });
});