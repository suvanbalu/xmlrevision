const {Schema,model} = require("mongoose");
const validator = require("validator")
const schema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Invalid");
            }
        }
    },
    password:{
        type:String,
        validate(value){
            if(value.length<=8){
                throw new Error("Password is INvalid");
            }
        }
    }
})

module.exports = model("User",schema);