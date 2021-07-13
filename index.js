const { request, response } = require("express");

const express = require("express");
const { v4 } = require("uuid");

const app = express();
app.use(express.json());

const users = [];

//get USERS
app.get("/Users", (request, response) => {
    const { name, username } = request.params;
    return response.json(users);
});

//post USERS
app.post("/Users", (request, response) => {
    const { name, username } = request.body; 
    const user = { id: v4(), name, username,todos: [] };
    users.push(user);
    return response.json(user);
})


//get TODOS
app.get("/todos", (request, response) => {

    const username = request.headers;
    const { title, deadline } = request.params;

    const userIndex = users.findIndex( user => user.username === username);
    if (userIndex < 0) {
        return response.status(400).json({ error: 'Username não foi encontrado'});
    }
    
    return response.json(users[userIndex].todos);
});

//post TODOS
app.post("/todos", (request,response) => {

    const username = request.headers;
    const {title, deadline} = request.body;

    const todo = {
        Id: v4(),
        Title : title,
        Done: false,
        Deadline: deadline,
        //Created_at: 2021-07-27T00:00:00,
    }

    const userIndex = users.findIndex( user => user.username === username);
    if (userIndex < 0) {
        return response.status(400).json({ error: 'Username não foi encontrado'});
    }

    return response.json(users[userIndex].todos.push(todo));
})

//put TODOS
app.put("/todos/:id", (request, response) => {

    const username = request.headers;
    const { title, deadline } = request.body;
    const { id } = request.params;

    const userIndex = users.findIndex( user => user.username === username);
    if (userIndex < 0) {
        return response.status(400).json({ error: 'Username não foi encontrado'});
    }

    const todoIndex = todos.findIndex( todo => todo.id === id);
    if (todoIndex < 0) {
        return response.status(400).json({ error: 'todo não encontrado'});
    }
    
    const todo = {
        title,
        deadline
    }
    todos[todoIndex] = todo;
    return response.json(users[userIndex].todos[todoIndex])
});

//patch TODOS
app.patch("/todos/:id/done", (request, response) => {
    const username = request.headers;
    const {id} = request.params;

    const userIndex = users.findIndex( user => user.username === username);
    if (userIndex < 0) {
        return response.status(400).json({ error: 'Username não foi encontrado'});
    }

    const todoIndex = todos.findIndex( todo => todo.id = id );
    if (todoIndex < 0) {
        return response.status(400).json({ error: "todo não encontrado"})
    }

    return response.json(users[user.userIndex].todos[todoIndex].Done = true);
})


//delete TODOS
app.delete("/todos/:id", (request, response) => {

    const username = request.headers;
    const { id } = request.params;

    const userIndex = users.findIndex( user => user.username === username);
    if (userIndex < 0) {
        return response.status(400).json({ error: 'Username não foi encontrado'});
    }

    const todoIndex = todos.findIndex( todo => todo.id === id);
    if (todoIndex < 0) {
        return response.status(400).json({ error: 'todo não encontrado'});
    }

    users[userIndex].todos.splice(todoIndex, 1)
    return response.status(204).json()
});



app.listen(1234)