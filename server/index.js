const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const  PORT = 5000;
app.use(cors());
app.use(express.json());

app.get("/api/get/study-location", (req, res) => {
    db.query("SELECT spot_id, building, location \
                FROM study_spots", (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
});

// Route to get all posts
app.get("/api/get", (req, res) => {
    db.query("SELECT * \
                FROM study_spots", (err, result) => {
        if (err) console.log(err)
        res.send(result)
    });
});

app.get("/api/get/test", (req, res) => {
    db.query("SELECT * \
                FROM test", (err,result) => {
        if (err) console.log(err)
        res.send(result)
    })
});

app.post("/api/post/hello", (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "studybuddynotredame@gmail.com",
            pass: "pwpwpwpw"
        }
    });

    let text = "Hello world from \n" + req.body.name;
    
    let mailOptions = {
        from: "studybuddynotredame@gmail.com",
        to: "studybuddynotredame@gmail.com",
        subject: "Test Email!",
        text: "Hello"
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
            res.json({yo: "error"});
        } else {
            console.log("Message sent: " + info.response);
            res.json({yo: info.resposne});
        }
    })
});

app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT)
})
