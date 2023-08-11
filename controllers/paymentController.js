const stripe = require('stripe')('sk_test_51Ndg2HSEkqwTKutWCI6DzxluVB6tUJV4BSsvWuVb3bsgLjIR4ImHqOgDJCG7DiHZabz2XhXchQUCKF5h2jTjEoG300g0DV6B7Z');
const req = require('express/lib/request');
const users = require("../models/userInfoSchema") ; 
const paidSubs = require("../models/paidSubscr") ;
const monthlyPlans = require("../models/subsSchemaMonthly") ; 
const yearlyPlans = require("../models/subsSchemaYearly") ; 

module.exports.makePayment = async function(request , response){
    var user = await users.findById(request.body.uid) ; 
    var param ={
        email : user.email , 
        name: user.name , 
        description : "Timeline of Subscription: " + request.body.timeline + "| Type of Subscription: " + request.body.type 
    }

    await stripe.customers.create(param, function (err,customer) {
        if(err)
        {
            console.log("err: "+err);
        }if(customer)
        {
            console.log("success: "+customer)
        }else{
            console.log("Something wrong")
        }
    }) ; 
    var amount = request.body.amountPayable.replace('₹', '') ; 
    console.log(amount) ; 
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount)*100,
        currency: 'inr',
        payment_method: 'pm_card_visa',
    });

    let subcreated = await paidSubs.create({ 
        uid : request.user._id , 
        timeline : request.body.timeline , 
        type : request.body.type , 
        amountPaid : request.body.amountPayable 
    });

    console.log(subcreated._id) ; 

    var plan ; var type ; var startDate ; var endDate ; var pref ; 


    const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1; // Note: Months are zero-based
        const day = currentDate.getDate();

        startDate = `${year}-${month}-${day}`

    if(request.body.timeline == "Monthly"){
        plan = await monthlyPlans.findOne({ name : request.body.type}) ; 
        type = "Monthly" ; 
        const { addMonths, format } = require('date-fns');
        const oneMonthLater = addMonths(currentDate, 1);

        endDate = format(oneMonthLater, 'yyyy-MM-dd');
        pref = plan.monthly_price+"/mon"
    }
    else{
        plan = await yearlyPlans.findOne({ name : request.body.type}) ; 
        type = "Yearly" ; 

        function addYears(date, years) {
            const newDate = new Date(date);
            newDate.setFullYear(date.getFullYear() + years);
            return newDate;
          }
          
          const currentDate = new Date();
          const oneYearLater = addYears(currentDate, 1);
          
          endDate = `${oneYearLater.getFullYear()}-${String(oneYearLater.getMonth() + 1).padStart(2, '0')}-${String(oneYearLater.getDate()).padStart(2, '0')}`;
          console.log(formattedDate);
        pref = plan.yearly_price+"/yr"
    }

    

    return response.render( "paymentSucces.ejs" , { 
        layout : "paymentSucces.ejs", 
        plan : plan , 
        OrderID : subcreated._id , 
        type : type ,
        startDate : startDate , 
        endDate : endDate , 
        price : pref , 
        timeline : request.body.timeline , 
        type: request.body.type
    }) ; 
}