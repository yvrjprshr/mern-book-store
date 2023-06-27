const express = require("express");
const mongoose = require("mongoose");
const router = require('./routes/bookroutes')
const cors = require('cors');
const app = express();

mongoose.connect(
    "mongodb+srv://admin:admin@cluster0.kkkqv4c.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => {
    console.log("connected to database");
})
.catch((err) => {
    console.log(err);
})

// middlewares
app.use(express.json());
app.use(cors());
app.use('/books', router);

app.listen(5000, ()=>{
    console.log('server running...');
})