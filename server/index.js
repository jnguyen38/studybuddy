const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const  PORT = 5001;
app.use(cors());
app.use(express.json());

app.get("/api/get/study-location", (req, res) => {
    db.query("SELECT spot_id, building, location \
                FROM study_spots", (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
});

app.get("/api/get", (req, res) => {
    db.query("SELECT * \
                FROM study_spots", (err, result) => {
        if (err) console.log(err)
        res.send(result)
    });
});

app.post("/api/post/admin", (req, res) => {
    db.query(`SELECT admin \
                FROM users \
                WHERE username=\"${req.body.user}\" and password=\"${req.body.password}\"`, (err, result) => {
        if (err) console.log(err)

        if (result.length) {
            if (result[0].admin) res.send(true)
            else res.send(false)
        } else {
            res.send(false)
        }

    });
});

app.post("/api/post/review", (req, res) => {
    db.query(`INSERT INTO reviews (time, date, content, name, rating, space_id) \
                VALUES (now(), curdate(), \"${req.body.content}\", \"${req.body.name}\", ${req.body.rating}, ${req.body.space_id})`, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    });
});

app.post("/api/post/editDesc", (req, res) => {
    db.query(`UPDATE study_spots \
                SET description=\"${req.body.description}\" \
                WHERE spot_id=\"${req.body.id}\"`,(err, result) => {
        if (err) console.log(err)
        res.send(result)
    });
});

app.post("/api/post/search", (req, res) => {
    let building = (req.body.building) ? `building="${req.body.building}"` : `building!=""`;
    let seatComfort = (req.body.seatComfort) ? `` : ``;
    let outlets = (req.body.outlets) ? `outlets_rating=${req.body.outlets}` : `outlets_rating>=1`;
    let loudness = (req.body.loudness) ? `loudness_rating=${req.body.loudness}` : `loudness_rating>=1`;
    let naturalLight = (req.body.naturalLight) ? `natural_light_rating=${req.body.naturalLight}` : `natural_light_rating>=1`;
    let capacity = (req.body.capacity) ? `max_capacity>=${req.body.capacity}` : `max_capacity>=1`;
    let group = (req.body.group) ? `max_group_size>=${req.body.group}` : `max_group_size>=1`;
    console.log(building)
    console.log(outlets)
    console.log(loudness)
    console.log(naturalLight)
    console.log(capacity)
    console.log(group)
    db.query(`SELECT * \
                FROM study_spots \
                WHERE ${building} AND ${outlets} AND ${loudness} AND ${naturalLight} AND ${group} AND ${capacity}`, (err, result) => {
        if (err) console.log(err)
        res.send(result)
    })
});

app.listen(PORT, ()=>{
    console.log("Server is running on port " + PORT)
})
