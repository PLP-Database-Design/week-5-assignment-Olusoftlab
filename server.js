const express = require("express")
const app = express()
const mysql = require("mysql2")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config()
app.use(express.json())
app.use(cors())




//PORT creation
const PORT = 3300


const db = mysql.createConnection({

    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME

})




//verify connection

db.connect((err) => {

    if (err) return console.log("Erro connectingn to database")
    console.log("Database connected successfully", db.threadId)

    app.set("view engine", "ejs")
    app.set("views", __dirname + "/views")


    app.get("/data", (req, res) => {

        db.query("SELECT * FROM patients", (err, result) => {

            if (err) {

                console.error(err)
                res.status(500).send("Error retrieving data")
            } else {

                res.render("data", { result })

            }

        })

    })

    app.get("/providers", (req, res) => {

        db.query("SELECT  * FROM providers", (err, result) => {

            if (err) {
                console.log(err)
                res.status(500).send("Error retrieving data")
            } else {

                res.render("provider_data", { result })

            }

        })

    })

    app.get("/patient_first_name", (req, res) => {

        db.query("SELECT first_name FROM patients", (err, result) => {

            if (err) {
                console.log(err)
                res.status(500).send("Error retrieving data")
            } else {

                res.render("patients_first", { result })

            }

        })


    })



    app.get("/provider_specialty", (req, res) => {

        db.query("SELECT Povider_specialty FROM providers", (err, result) => {

            if (err) {
                console.log(err)
                res.status(500).send("Error retrieving data")
            } else {

                res.render("provider_specialty", { result })

            }

        })


    })


    app.get("/", (req, res) => {

        res.send("sending request to server")

    })

    app.listen(PORT, () => {

        console.log(`Server running on port ${PORT}`)
        console.log("sending message to server")

    })


})



