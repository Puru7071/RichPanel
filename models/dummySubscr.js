// we need same instance of the data base established before.
const mongoose = require("mongoose") ; 

const dummySubsSchema = mongoose.Schema({
    uid :  {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "users"
    } , 
    timeline : {
        type : String , 
        required : true , 
    } , 
    type :{
        type : String , 
        required : true 
    } , 
    amountPayable:{
        type : String , 
        required : true 
    }
} , {
    timestamps : true 
}) ; 

// creating user document using the userSchema.
const dummySubs = mongoose.model("dummySubs" , dummySubsSchema) ; 

// exporting the user document created by the above step.
module.exports =  dummySubs ; 