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

// ---------  Routes

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
    const {title, description, col} = req.body
    const newTodo = await pool.query("INSERT INTO todo (title, description, col) VALUES ($1, $2, $3) RETURNING *", [title, description, col])
    res.json(newTodo)
  } catch (err) {
    console.log(err)
  }
})
//update
app.put("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params
    const {description, title, col} = req.body
    const updateTodo = await pool.query("UPDATE todo SET title = $1, description = $2, col = $3 WHERE todo_id = $4", [title, description, col, id])
    res.json("added to do")
  } catch (error) {
    console.log(error)
  }
})
//delete
app.delete("/todos/:id", async (req, res) => {
  try {
    const {id} = req.params
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id])
    res.json("The todo has been deleted")
  } catch (error) {
    console.log(error)
  }
})
export default app