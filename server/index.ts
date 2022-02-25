import express from 'express'
import cors from 'cors'
import {json, urlencoded} from 'body-parser'
const pool = require("db")

const app = express()

const PORT = 5000

app.use(cors())
app.use(json())
app.use(urlencoded({extended: true}))

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`)
})

app.get("/", (_, response) => {
    response.send("Hello World")
})

//Routes

//getAll
//create
//update
//delete

export default app