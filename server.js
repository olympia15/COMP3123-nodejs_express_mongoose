const express = require("express")
const booksRoutes = require("./routes/books")
const mongoose = require("mongoose")

const app = express()

const DB_CONNECTION_STRING = "mongodb+srv://olympiamichelle15_db_user:PEtyGmS9Ww4OoyWk@cluster0.jagakrk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
const SERVER_PORT = process.env.SERVER_PORT || 3001

app.use(express.json())
app.use(express.urlencoded())


app.use("/api/v1", booksRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>MogoDB + Mongoose Example</h1>")
    })

mongoose.connect(DB_CONNECTION_STRING)
    .then(() => {
        console.log("Connected to MongoDB")
        app.listen(SERVER_PORT, () =>{
            console.log(`Server running at http://localhost:${SERVER_PORT}/`)
        })
    })
    .catch((err) => {
        console.log("Error connecting to MongoDB:", err.message)
    })    
