// Here we need express module to create the router so that for particular URL we can
// redierct to particular controller present in the userPagesController file.

const express = require("express") ; 


const router = express.Router() ; 

const passport = require('passport');

const userController = require("../controllers/userPagesController") ; 
const paymentController = require("../controllers/paymentController") ; 
const paymentCancelController = require("../controllers/cancelPayment") ; 


// here passport.checkAuthentication is just another middleware that make sure the user is authenticated
// and pass on to next controller function if not then redirect the sign-in page.
// router.get("/profile/:id" ,passport.checkAuthentication, userController.showProfile) ; 
// //here note that :id is param 

router.get("/home-page" , passport.checkAuthentication , userController.showHomePage) ; 

router.post("/complete-payement" , paymentController.makePayment) ;

router.post("/delete" , paymentCancelController.cancelPayement) ;

router.post("/sign-up" , userController.createNewUser) ;

router.post("/otp-check" , userController.checkOTP) ; 

// if the request is /users/sign-in then use this middleware first passport.authenticate to 
// check the user credential via passport stategy that is local which is being defined already.
router.post("/sign-in" ,passport.authenticate(
    "local" ,
    {failureRedirect : '/sign-in'} , //incase of any error redirect to /sign-in page.
),userController.createSessionForValidUserMainMethod) ; // then after authentication move on to the controller
// function mentioned below.

router.get("/sign-out",userController.destroySession) ; 

// telling all the info we require from the google after the authetication. 
// router.get('/auth/google' , passport.authenticate("google" , {scope: ['profile' , 'email']})) ; 

router.post("/submit" , userController.makeDummyPayment) ; 


module.exports = router ; 