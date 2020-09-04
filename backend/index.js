require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const authRoute = require('./routes/auth');

const app = express();

// DataBase Connection
mongoose.connect(process.env.DATABASEURL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then( () => {
    console.log('Database Successfully Connected');
} )
.catch( () => {
    console.log('Database Failed To Connect');
} )

// 3rd Party Middleware
app.use(bodyParser.json());
app.use(cors());

// Custom Middleware
app.use('/api', authRoute);

// Server Starting
app.listen(3100, () => {
    console.log("Server Running");
})