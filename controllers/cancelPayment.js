const stripe = require('stripe')('sk_test_51Ndg2HSEkqwTKutWCI6DzxluVB6tUJV4BSsvWuVb3bsgLjIR4ImHqOgDJCG7DiHZabz2XhXchQUCKF5h2jTjEoG300g0DV6B7Z');
const req = require('express/lib/request');
const users = require("../models/userInfoSchema") ; 
const paidSubs = require("../models/paidSubscr") ;
const monthlyPlans = require("../models/subsSchemaMonthly") ; 
const yearlyPlans = require("../models/subsSchemaYearly") ; 

module.exports.cancelPayement = async function(request , response){

    
    console.log()

    const result = await paidSubs.deleteOne({ _id: request.body.OrderID});


    var plan ; var type ; var startDate ;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Months are zero-based
    const day = currentDate.getDate();

    startDate = `${year}-${month}-${day}`

    if(request.body.timeline == "Monthly"){
        plan = await monthlyPlans.findOne({ name : request.body.type}) ; 
        type = "Monthly" ; 
        pref = plan.monthly_price+"/mon"
    }
    else{
        plan = await yearlyPlans.findOne({ name : request.body.type}) ; 
        type = "Yearly" ; 
        pref = plan.yearly_price+"/yr"
    }

    return response.render("paymentFail.ejs" , {
        layout : "paymentFail.ejs" , 
        plan : plan , 
        type : type ,
        startDate : startDate , 
        price : pref , 
        timeline : request.body.timeline , 
        type: request.body.type
    })

}