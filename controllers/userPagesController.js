// Some of the DB documents required for the this controllere file to function properly.
const users = require("../models/userInfoSchema") ; 
const OTP = require("../models/otpSchema") ;

const subsMonthly = require("../models/subsSchemaMonthly") ; 
const monthlyPlans = require("../db/monthlySubs") ; 

const subsYearly = require("../models/subsSchemaYearly") ; 
const yearlyPlans = require("../db/yearlySubs") ;

const dummySubs = require("../models/dummySubscr") ; 


const otpMailer = require("../mailer/OTPMailer") ; 
const { populate } = require("../models/userInfoSchema");

// these are the required modules for the controller file to work.
const res = require("express/lib/response");
const path = require("path") ; 
const fs = require("fs") ; 
const req = require("express/lib/request");

// controller function to make new user in Datebase.
module.exports.createNewUser = async function(request, response) {
    try {
        // Finding the user via email input field to check if the user already exists.
        const user = await users.findOne({ email: request.body.email });

        if (user) {
            // If the user is found, the email is already in use.
            console.error("Email Already in use!");
            request.flash("error", "Email already in use.");
            return response.redirect("/sign-in");
        }

        // Creating an OTP and a new user entry.
        const randomString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const genOTP = (Math.floor(Math.random() * 10000)) +
            randomString[(Math.floor(Math.random() * 100) % 52)] +
            randomString[(Math.floor(Math.random() * 100) % 52)] +
            randomString[(Math.floor(Math.random() * 100) % 52)] +
            randomString[(Math.floor(Math.random() * 100) % 52)];

        const OTPUser = await OTP.create({
            OTP: genOTP,
            email: request.body.email,
            name: request.body.name,
            password: request.body.password
        });

        console.log(OTPUser);
        otpMailer.otpMailSender(request.body.email, genOTP);
        return response.redirect("/otp-page");
    } 
    
    catch (error) {
        console.log(`Something went wrong: ${error}`);
        request.flash("error", "Something went wrong.");
        response.redirect("back");
    }
};


module.exports.checkOTP = async function(request , response){
    var checkedOTP = await OTP.findOne({OTP : request.body.OTP}) ; 

    if(checkedOTP){
        try {
            const newUser = await users.create({
                email: checkedOTP.email,
                name: checkedOTP.name,
                password: checkedOTP.password,
                personlInfo: checkedOTP.Bio,
                postBlocked: 0,
                avatar: null
            });
        
            console.log(`New User Created Successfully: ${newUser}`);
            request.flash("success", "Verification was Successful !!");
        
            await OTP.deleteOne({ OTP: request.body.OTP });
        
            return response.redirect("/sign-in");
        } catch (error) {
            console.error(`Error in creating new User: ${error}`);
            request.flash("error", "Error in creating user");
            return response.redirect("back");
        }
    }
    else{
        request.flash("error" , "OTP Entered is wrong !!") ; 
        return response.redirect("/sign-up") ; 
    }

}

// made this controller function asynchronous so one function is executed before moving to next.
// // module.exports.showProfile = async function(request , response){
//     try{
//         // finding the post of the user 
//         let posts = await post.find({user : request.params.id})
//         .populate("user") // then populating the user field  with info user info it is ref to via user ID.
//         .populate({
//             path: "comments" , // populating all comments with comments its refering to via it comment ID its refering to.
//             populate: {     // then populating the each comment's field user with user's info it is refering to.
//                 path: "user"
//             }
//         });
        
//         console.log("showing posts") ; 
//         console.log(posts) ; 
        

//         posts.reverse() ; // reversing the post array so as to get most recent post at the top.
//         let user = await users.findById(request.params.id) ; // then finding the targeted user of which profile is
//         // being openned.

//         // Then finding all the comments being made by the user whose profile is bieng openned. 
//         let allComments = await comments.find({user: request.params.id}).
//         populate("user");  // then populating the each comment's field user with user it is refering to.


//         console.log(user) ; 
//         allComments.reverse() ; // reversing the comments array so as to get most recent post at the top.
//         return response.render("userProfile" , {
//             layout : "userProfile.ejs" , 
//             posts : posts , 
//             isHome : false ,
//             targetUser : user , 
//             allComments : allComments 
//         }) ;
//     }
//     catch(error){
//         //if error then give notification via Noty.
//         console.error(`Sonething went wrong --> ${error}`) ; 
//         request.flash("error" , "Something went wrong") ; 
//         response.redirect("back") ; // and going back.
//     }
// }
  
// made this controller function asynchronous so one function is executed before moving to next.
module.exports.showHomePage = async function(request , response){
    try{
        var arr1 = monthlyPlans.monthly_plans ; 
        console.log(arr1.length) ; 
        for(i = 0 ; i < arr1.length ; i ++){
            console.log(arr1[i]) ; 
            var plan1 = await subsMonthly.findOne({ name: arr1[i].name });
            if(plan1){
                plan1.monthly_price = arr1[i].monthly_price ; 
                plan1.resolution = arr1[i].resolution ; 
                plan1.video_quality = arr1[i].video_quality ; 
                plan1.device_type = arr1[i].device_type ; 
                plan1.screen_number = arr1[i].screen_number ; 
                plan1.save()  ; 
            }
            else{
                plan1 = await subsMonthly.create(arr1[i]); 
                console.log("New Plan Added Successfully" + plan1) ; 
            }
        }

        var arr2 = yearlyPlans.yearly_plans ; 
        console.log(arr2.length) ; 
        for(i = 0 ; i < arr2.length ; i ++){
            console.log(arr2[i]) ; 
            var plan1 = await subsYearly.findOne({ name: arr2[i].name });
            if(plan1){
                plan1.yearly_price = arr2[i].yearly_price ; 
                plan1.resolution = arr2[i].resolution ; 
                plan1.video_quality = arr2[i].video_quality ; 
                plan1.device_type = arr2[i].device_type ; 
                plan1.screen_number = arr2[i].screen_number ; 
                plan1.save()  ; 
            }
            else{
                plan1 = await subsYearly.create(arr2[i]); 
                console.log("New Plan Added Successfully" + plan1) ; 
            }
        }
        var fields1 = ["Monthly Price" , "Resolution" , "Video Quality" , "Device you can use to watch"] ; 
        var ref1 = ["monthly_price" , "resolution" , "video_quality" , "device_type"] ; 

        var fields2 = ["Yearly Price" , "Resolution" , "Video Quality" , "Device you can use to watch"] ; 
        var ref2 = ["yearly_price" , "resolution" , "video_quality" , "device_type"] ; 

        var timeLine = ["Mobile" , "Basic" , "Standard" , "Premium"] ; 

        return response.render("userHomePage.ejs" , {
            layout : "userHomePage.ejs" , 
            monthlyPlans : monthlyPlans.monthly_plans, 
            yearlyPlans : yearlyPlans.yearly_plans ,
            fields1 : fields1 , ref1 : ref1 , 
            fields2 : fields2 , ref2 : ref2 , 
            timeLine : timeLine
        }) ;
    }catch(error){
        //if error then give notification via Noty.
        console.error(`Something went wrong--> ${error}`) ; 
        request.flash("error" , "Something went wrong") ;
        return response.redirect("back") ; // and going back.
    }
}

module.exports.makeDummyPayment = async function(request , response){
    var user = await users.findOne({id : request.user._id}) ; 
    console.log(user); 
    var plan ; 

    if(request.body.timeline == "Monthly"){
        plan = await subsMonthly.findOne({name : request.body.type}) ;
        const subs = await dummySubs.create({
            uid : request.user._id ,
            timeline : request.body.timeline ,
            type : request.body.type , 
            amountPayable : plan.monthly_price
        });  

        return response.render("payment.ejs" , {
            layout : "payment.ejs" , 
            uid : subs.uid , 
            timeline: subs.timeline , 
            type : subs.type , 
            amountPayable : subs.amountPayable , 
            pre : "/mon" , 
        }) ;
    }
    else{
        plan = await subsYearly.findOne({name : request.body.type}) ;
        const subs = await dummySubs.create({
            uid : request.user._id ,
            timeline : request.body.timeline ,
            type : request.body.type , 
            amountPayable : plan.yearly_price
        });  

        return response.render("payment.ejs" , {
            layout : "payment.ejs" , 
            uid : subs.uid , 
            timeline: subs.timeline , 
            type : subs.type , 
            amountPayable : subs.amountPayable , 
            pre : "/yr" 
        }) ;
    }
}

// setting up home page for the valid users. 
module.exports.createSessionForValidUserMainMethod = function(request , response){
    request.flash("success" , "Logged in Successfully!!!") ; 
    return response.redirect("/users/home-page") ; 
}

module.exports.destroySession = function(request , resposne){
    request.logout() ; 
    // Passport exposes a logout() function on req (also aliased as logOut() ) 
    // that can be called from any route handler which needs to terminate a login session.
    request.flash("success" , "Logged out Successfully!!!") ; 
    return resposne.redirect("/") ; 
}


