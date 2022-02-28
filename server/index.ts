import express from 'express'
import cors from 'cors'
import {json, urlencoded} from 'body-parser'
const pool = require("./db")

const app = express()

const PORT = 5000

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
})
/*
app.get("/todos", (_, response) => {
    response.send("Hello World")
})
*/
//Routes

//getAll

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")

        res.json(allTodos.rows)
    } catch (error) {
        console.log(error)
    }
})

// get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id])
        res.json(todo.rows[0])
    } catch (error) {
        console.log(error)
    }
})
//create

app.post("/todos", async (req, res) => {
    try {
        const {title, description} = req.body
        console.log(title, description)
        const newTodo = await pool.query("INSERT INTO todo (title, description) VALUES ($1, $2) RETURNING *", [title, description])

        res.json(newTodo)
    } catch (err) {
        console.log(err)
    }
})

//update

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const {description} = req.body
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id])
        res.json("added to do")
    } catch (error) {
        console.log(error)
    }
})
//delete

export default app