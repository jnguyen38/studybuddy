const express = require('express');
const db = require('./config/db');
const cors = require('cors');
const axios = require('axios');
const fs = require('fs');
const http = require('http');
const https = require('https');
const {spawn} = require('child_process');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.studybuddynd.com/privkey.pem');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.studybuddynd.com/fullchain.pem');
const credentials = {key: privateKey, cert: certificate};

const app = express();

app.use(cors());
app.use(express.json());

/* GET API ENDPOINTS */

app.get("/api/get", (req, res) => {
    db.query("SELECT * \
                FROM study_spots \
                ORDER BY building", (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/likes", (req, res) => {
	db.query(`SELECT * \
          FROM likes`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/reviews", (req, res) => {
	db.query(`SELECT * \
          FROM reviews`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/work", (req, res) => {
	db.query(`SELECT DISTINCT work_type \
          FROM reviews`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/majors", (req, res) => {
    db.query("SELECT major \
                FROM majors \
                ORDER BY major;", (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/buildings", (req, res) => {
    db.query("SELECT DISTINCT building \
                FROM buildings", (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/usernames", (req, res) => {
    db.query("SELECT username \
                FROM users;", (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/emails", (req, res) => {
    db.query("SELECT email \
                FROM users;", (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/location", (req, res) => {
    db.query(`SELECT * \
                FROM study_spots \
                WHERE spot_id = ?`, [req.query.spot_id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/groupRec", (req, res) => {
    console.log(req.query)
    let group = `max_group_size >= ${req.query.groupSize}`;
    //let loudness = `loudness_rating > 1`;
    let whiteboard = (req.query.whiteboard === 'true') ? `notes like '%whiteboard%'` : `1=1`;
    let computer = (req.query.computer === 'true') ? `notes like '%computer%'` : `1=1`;
    let tv = (req.query.tv === 'true') ? `notes like '%tv%'` : `1=1`;
    let printer = (req.query.printer === 'true') ? `printer` : `1=1`

    //console.log(`${whiteboard}, ${computer}, ${tv}`)

    db.query(`SELECT * \
                FROM study_spots \
                WHERE ${group} \
                  and ${whiteboard} and ${computer} \
                  and ${tv} and ${printer}`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/groupReviews", (req, res) => {
    let users = req.query.users

    let userQuery = ""
    for (let i = 0; i < users.length; i++) {
        if (i < (users.length - 1))
            userQuery += `username='${users[i]}' OR `
        else
            userQuery += `username='${users[i]}'`
    }

    db.query(`SELECT spot_id, rating \
                FROM reviews \
                WHERE ${userQuery}`, (err, result) => {
        if (err) console.log(err)
        console.log(result)
        res.send(result)
    })
})


app.get("/api/get/buildingInfo", (req, res) => {
    db.query(`SELECT * \
                FROM buildings \
                WHERE building = ?`, [req.query.building], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    })
});

app.get("/api/get/allPhotos", (req, res) => {
    let dataToSend;
	const input = `${req.query.spot_id}`;
    const python = spawn('python', ['server/py/get_pictures.py', input]);
    python.stdout.on('data', data => {
        console.log('Pipe data from python script ...');
        dataToSend = data.toString();
    });
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.send(dataToSend);
    });
});

app.get("/api/get/overallRating", (req, res) => {
    db.query(`SELECT avg(rating) \
                FROM reviews \
			    WHERE spot_id = ?`, [req.query.spot_id], (err, result) => {
        let avg = parseInt(result[0]["avg(rating)"]);
        if (!avg) avg = 0;
        db.query(`UPDATE study_spots \
                    SET overall_rating = ${avg} \
                    WHERE spot_id = ?`, [req.query.spot_id]);
        if (err) console.log(err);
        res.send(result);
    });
});

/* PUT API ENDPOINTS */

app.put("/api/put/edit", (req, res) => {
    db.query(`UPDATE study_spots \
                SET ${req.body.query} = ? \
                WHERE spot_id = ?`, [req.body.description, req.body.id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.put("/api/put/signin", (req, res) => {
    db.query(`SELECT first_name, last_name, username, admin \
                FROM users \
                WHERE username=\"${req.body.user}\" and password=\"${req.body.password}\"`, (err, result) => {
        if (err) console.log(err);

        let user = {isSignedIn: false, isAdmin: false, firstName: "", lastName: "", username: ""};
        if (result.length) {
            db.query(`UPDATE users SET last_login=now(), latitude=${req.body.latitude}, longitude=${req.body.longitude} WHERE username=\"${req.body.user}\"`);
            user.isSignedIn = true;
            user.isAdmin = (result[0].admin) ? true : false;
            user.firstName = result[0].first_name;
            user.lastName = result[0].last_name;
            user.username = result[0].username;
        }

        res.send(user);

    });
});

app.put("/api/put/toggleLike", (req, res) => {
    db.query(`SELECT username, spot_id, like_bool \
                FROM likes \
                WHERE spot_id=\"${req.body.spot_id}\" and username=\"${req.body.user}\"`, (err, result) => {
        if (err) console.log(err);

        if (result.length) {
            db.query(`UPDATE likes \
                      SET like_bool=${!result[0].like_bool} \
                      WHERE spot_id=\"${req.body.spot_id}\" and username=\"${req.body.user}\"`);
        } else {
            db.query(`INSERT INTO likes (username, spot_id, like_bool) \
                      VALUES (\"${req.body.user}\", \"${req.body.spot_id}\", 1)`);
        }

        res.send(result);
    });
});


/* POST API ENDPOINTS */

app.post("/api/post/review", (req, res) => {
    db.query(`INSERT INTO reviews (time, date, content, name, rating, spot_id, work_type, username) \
                VALUES (now(), curdate(), \"${req.body.description}\", \"${req.body.name}\", ${req.body.rating}, \"${req.body.spot_id}\", \"${req.body.work_type}\", \"${req.body.username}\")`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
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

    db.query(`SELECT * \
                FROM study_spots \
                WHERE ${building} AND ${outlets} AND ${loudness} AND ${naturalLight} AND ${group} AND ${capacity}`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});


app.post("/api/post/searchHistory", (req, res) => {
    let tableSeatComfort = "table_seat_comfort<=" + ((req.body.comfort) + 1) + " AND table_seat_comfort>=" + ((req.body.comfort) - 1);
    let seatComfort = "nontable_seat_comfort<=" + ((req.body.comfort) + 1) + " AND nontable_seat_comfort>=" + ((req.body.comfort) - 1);
    let couchComfort = "couch_comfort<=" + ((req.body.comfort) + 1) + " AND couch_comfort>=" + ((req.body.comfort) - 1);
    let outlets = "outlets_rating<=" + ((req.body.outlet) + 1) + " AND outlets_rating>=" + ((req.body.comfort) - 1);

    let loudness = "loudness_rating<=" + ((req.body.loud) + 1) + " AND loudness_rating>=" + ((req.body.loud) - 1);
    let light = "natural_light_rating<=" + ((req.body.light) + 1) + " AND natural_light_rating>=" + ((req.body.light) - 1);
    let capacity = ("max_capacity<=" + ((req.body.capacity) + (req.body.capacity >= 60 ? 20 : (req.body.capacity >= 30 ? 15 : (req.body.capacity >= 15 ? 10 : 5)))) +
          " AND max_capacity>= " + ((req.body.capacity) - (req.body.capacity >= 60 ? 20 : (req.body.capacity >= 30 ? 15 : (req.body.capacity >= 15 ? 10 : 5)))))
    let table = "tables=" + Math.round(req.body.table);

    db.query(`SELECT * \
                FROM study_spots \
                WHERE ((${tableSeatComfort}) OR (${seatComfort}) OR (${couchComfort})) AND ${outlets} AND ${loudness} AND ${light} AND ${capacity} AND ${table}`, (err, result) => {
        if (err) console.log(err);
        console.log(result)
        res.send(result);
    });
});

app.post("/api/post/location", (req, res) => {
    db.query(`SELECT * \
                FROM study_spots \
                WHERE spot_id = ?`, [req.body.spot_id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.post("/api/post/signup", (req, res) => {
	db.query(`INSERT INTO users (first_name, last_name, email, major, latitude, longitude, last_login, created, username, password, admin) \
                VALUES (\"${req.body.first_name}\", \"${req.body.last_name}\", \"${req.body.email}\", \"${req.body.major}\", ${req.body.latitude}, ${req.body.longitude}, now(), now(), \"${req.body.username}\", \"${req.body.password}\", 0)`, (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});

app.post("/api/post/upload", (req, res) => {
    const rb = req.body;
    db.query(`INSERT INTO uploads (building, location, floor, description, tables, table_seat_comfort, nontable_seat_comfort, couch_comfort, max_group_size, natural_light_rating, printer, loudness_rating, overall_rating, max_capacity, notes)
                VALUES (?, ?, ${rb.floor}, ?, ${rb.tables}, ${rb.comfort}, ${rb.comfort}, ${rb.comfort}, ${rb.group}, ${rb.naturalLight}, ${rb.printer}, ${rb.loudness}, ${rb.overall}, ${rb.outlets}, ${rb.capacity}, ?`,
                [rb.building, rb.location, rb.description, rb.notes], (err, result) => {

        if (err) console.log(err);
        res.send(result);
    });
});

app.get("/api/get/distances", (req, res) => {

    const key = "AIzaSyBYmmmLt6AxjNqDP4DW-uGZ8UHTPGqkgRE" // API Key
    const units = "imperial"
    const mode = "walking"
    const maps_url = "https://maps.googleapis.com/maps/api/distancematrix/json?"

    let building = req.query.building
    let locString = ""
    for (let i = 0; i < req.query.locs.length; i++) {
        if (i < (req.query.locs.length - 1))
            locString += `${req.query.locs[i]}, Notre Dame, IN | `
        else
            locString += `${req.query.locs[i]}, Notre Dame, IN`
    }

    let url = `${maps_url}origins=${locString}, Notre Dame, IN&destinations=${building}, Notre Dame, IN&units=${units}&mode=${mode}&key=${key}`
    axios.get(url).then(response => {
        let distances = []
        for (let i = 0; i < req.query.locs.length; i++) {
            distances.push(parseInt(response.data["rows"][i]["elements"][0]["duration"]["text"].split(" ")[0]))
        }
        res.send(distances)
    })
});

/* LISTENERS */

let httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

httpServer.listen(8080);
httpsServer.listen(8443);
