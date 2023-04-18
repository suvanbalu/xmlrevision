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


app.post("/api/login",(req,res)=>{
    const {name,password} = req.body;
    try{
        console.log(name,password);
        const user = User.findOne({name:name}).
        then((user)=>{
            if(user){
                if(user.password == password){
                    res.json({
                        status:200,
                        message:"Login Successful"
                    })
                }
                else{
                    res.json({
                        status:400,
                        message:"Invalid Credentials"
                    })
                }
            }
            else{
                res.json({
                    status:400,
                    message:"Invalid Credentials"
                })
            }
        })
    }
    catch(err){
        res.status(500).send(err)
    }
})

app.post("/api/addmedicine",(req,res)=>{
    const {m_name,m_qty,m_price} = req.body;
    const med = new Medicine(
        req.body
    );
    med.save()
    .then(()=>{
        res.send("Medicine Added Successfully");
    })
    .catch((err)=>{
        res.status(400).send(err);
    })
})

app.patch("/api/updatemed/:m_name",(req,res)=>{
    const{m_name} = req.params;
    const med = Medicine.findOneAndUpdate(
        {m_name:m_name},
        req.body,
        {new:false})
    if(med){
        res.status(200).send('updated Successfully');
    }
    else{
        res.send(404).send('Item not found')
    }
});

app.get("/api/seemed", async (req, res) => {
    try {
      const meds = await Medicine.find().lean(); // execute the query and convert the result to plain JS object
      res.json(meds); // send the result as a response
    } catch (err) {
      res.status(500).send(err);
    }
  });