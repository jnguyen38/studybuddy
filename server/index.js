const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 5000;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM userAge", (err,result)=>{
        if(err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.listen(PORT, ()=>{
    console.log("Server is running on ${PORT}")
})
