const express = require('express');
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const {json} = require("express");
const cors = require("cors");

const User = require("./schema/User");
const Medicine = require("./schema/Medicine");

app.use(json());
app.use(cors())
app.listen(port,()=>{console.log(`Server is running on port ${port}`)});

app.get("/",(req,res)=>{
    res.send("Hello World");
})

mongoose.connect(
    "mongodb+srv://20z256:FdSvDk3Dli4M2Fjs@medicine.i1k3yyg.mongodb.net/test"
).then(()=>{
    console.log("Mongo Connected Successfully");
}).catch((err)=>{
    console.log(err);
})

app.post("/api/signup",(req,res)=>{
    console.log(req.body);
    const {name,email,password} = req.body;
    const user = new User(
        {
            name:name,
            email:email,
            password:password
        }
    );
    user.save()
    .then(()=>{
        res.json({
            status:201,
            message:"User Created"
        })
    })
    .catch((err)=>{
        res.json({
            status:400,
            message:"Error Occured",
            error:err
        })
    })
})


