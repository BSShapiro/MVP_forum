require("dotenv").config();
const express = require("express");
const db = require("./db/conn.js");
const app = express();
const client = require("pg/lib/native/client");
const moment = require("moment");

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/", async (req, res) => {
    
})

app.post("/api/login", async (req, res) => {
    let worked;
    let data;
    try{
        data = await db.query(`SELECT * FROM profile WHERE user_name = '${req.body.user_name}';`);
        worked = true;
        console.log(data.rows);
    }catch(err){
        console.error(err);
        worked = false;
    }
    if(data.rows.length === 0){
        res.json('Account does not exist, please make a new account.');
    } else if(data.rows[0].password !== req.body.password){
        res.json('Password is incorrect.');
    } else if(data.rows[0].password === req.body.password && worked === true){
        res.json(data.rows[0]);
    } else if(worked === false){
        res.status(500).json('An error has occured.');
    }
});

app.post("/api/create", async (req, res) => {
    let worked;
    let data;
    try{
        data = await db.query(`SELECT * FROM profile WHERE user_name = '${req.body.user_name}';`)
    } catch(err){
        console.error(err);
    }
    if(data.rows.length === 0){
        try{
            await db.query(`INSERT INTO profile(user_name, password) VALUES ('${req.body.user_name}', '${req.body.password}');`);
            data = await db.query(`SELECT * FROM profile WHERE user_name = '${req.body.user_name}'`);
            worked = true;
        } catch(err){
            console.error(err);
            worked = false;
        }
        if(worked === true){
            res.json(data.rows[0])
        } else if(worked === false){
            res.status(500).json('An error has occured.')
        }
    } else if(data.rows.length > 0){
        res.json('Username already exists, please enter a new username.')
    }
})

app.post("/api/post", async (req, res) => {
    let worked;
    let data;
    let date = moment().format('yyyy-MM-DD HH:mm:ss');
    try{
        await db.query(`INSERT INTO posts_all(post, date, user_id) VALUES ('${req.body.post}', '${date}', ${req.body.user_id});`);
        data = await db.query(`SELECT * FROM posts_all WHERE date = '${date}';`);
        worked = true;
    }catch(err){
        console.error(err);
        worked = false;
    }
    if(worked === true){
        res.json(data.rows[0]);
    } else if(worked === false){
        res.status(500).json('An error has occured.');
    }
})

app.get("/api/posts", async (req, res) => {
    let worked;
    let data;
    try{
        data = await db.query('SELECT posts_all.post, posts_all.date, posts_all.user_id, posts_all.id, profile.user_name FROM posts_all INNER JOIN profile ON posts_all.user_id=profile.id ORDER BY date DESC;');
        worked = true;
    } catch(err){
        console.error(err);
        worked = false;
    }
    if(worked === true){
        res.json(data.rows);
    } else if(worked === false){
        res.status(500).json('An error has occured.');
    }
})

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});