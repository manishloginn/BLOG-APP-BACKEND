const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/route');
require('dotenv').config()
const app = express()
const cors = require('cors')


const PORT = process.env.PORT

const corsOptions = {
    origin: 'https://blog-app-frontend-six-mu.vercel.app', // Replace with the origin of your frontend
    // origin: 'http://localhost:3000', // Replace with the origin of your frontend
    credentials: true,              // Allows cookies to be sent and received
};

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cors(corsOptions))

// db connection
require('./dbconnection/dbconnection')

app.use('/', router)



app.listen(PORT , () => {
    console.log(`app is running on ${PORT}`)
})