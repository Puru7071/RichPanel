const mongoose = require("mongoose") ; 

const subSchema = mongoose.Schema({
    name :{
        type: String , 
        required: true ,
        unique : true  
    },
    monthly_price :{
        type : String , 
        required : true
    } ,  
    video_quality :{
        type : String , 
        required : true 
    } , 
    resolution :{
        type: String , 
        required : true 
    } , 
    device_type:[
        {
            type : String , 
            required : true 
        }
    ] , 
    screen_number : {
        type : String , 
        required : true 
    }
} , {
    timestamps : true 
}) ; 

const subsMonthly = mongoose.model("subsMonthly" , subSchema) ; 

module.exports = subsMonthly ; 