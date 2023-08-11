const mongoose = require("mongoose") ; 

const OTPschema = mongoose.Schema({
    OTP : {
        type: String 
    } , 
    email : {
        type : String , 
        required: true , 
        unique : true
    } , 
    password : {
        type: String , 
        required : true 
    } , 
    name : {
        type: String , 
        required : true 
    } ,
    subs : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : "users"
        } 
    ]
} , {
    timestamps : true 
}) ; 

OTPschema.index({createdAt: 1},{expireAfterSeconds: 120});

const OTP = mongoose.model("OTP" , OTPschema) ; 

module.exports = OTP ; 