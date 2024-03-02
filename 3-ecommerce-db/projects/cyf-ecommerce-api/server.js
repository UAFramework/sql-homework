import cors from "cors"
import db from "./db/db.js";
import express from "express";
// const express = require("express");


const app = express();
app.use(express.json())
app.use(cors())


app.get("/", (req, res) => {
    
    db.query("select version()")
    .then((result) => {
      res.status(200).send(result.rows[0]);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.get("/customers", async (req, res) => {
    try {
        const result = await db.query("select * from customers order by name asc");
           res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});

app.get("/suppliers", async (req, res) => {
    try {
        const result = await db.query("select * from suppliers order by name asc");
           res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({error});
    }
});


app.listen(3000, function () {
    console.log("Server is listening on port 3000. Ready to accept requests!");
  });
