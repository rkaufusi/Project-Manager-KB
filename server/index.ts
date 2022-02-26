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
//create

app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body
        console.log(description)
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [description])

        res.json(newTodo)
    } catch (err) {
        console.log(err)
    }
})

//update
//delete

export default app