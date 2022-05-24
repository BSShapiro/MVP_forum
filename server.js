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

app.get("/api/profiles", async (req, res) => {
    let worked;
    let data;
    try{
        data = await db.query("SELECT * FROM profile;")
        worked = true;
    }catch(err){
        console.error(err);
        worked = false;
    }
    if(worked === true){
        res.send(data.rows);
    } else if(worked === false){
        res.status(500).send('An error has occurred.')
    }
});

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});