(function () {
    "use strict" 
    
    console.log("Script Loaded");

    document.getElementById("btn-c1").addEventListener("click" , (event) => {
        event.stopPropagation() ; 

        document.getElementById("btn-c1").style.backgroundColor = "white" ; 
        document.getElementById("btn-c1").style.color = "#1e4c91" ; 

        document.getElementById("btn-c2").style.backgroundColor = "#1e4c91" ; 
        document.getElementById("btn-c2").style.color = "white" ;
        
        document.getElementById("plan-details-month").style.display = "flex"; 
        document.getElementById("plan-details-month").style.flexDirection = "column" ; 
        document.getElementById("plan-details-year").style.display = "none" ; 

        document.getElementById("timeline").value = "Monthly" ; 

    }) ; 

    document.getElementById("btn-c2").addEventListener("click" , (event) => {
        event.stopPropagation() ; 

        document.getElementById("btn-c2").style.backgroundColor = "white" ; 
        document.getElementById("btn-c2").style.color = "#1e4c91" ; 

        document.getElementById("btn-c1").style.backgroundColor = "#1e4c91" ; 
        document.getElementById("btn-c1").style.color = "white" ; 

        document.getElementById("plan-details-month").style.display = "none"; 
        document.getElementById("plan-details-year").style.display = "flex" ; 
        document.getElementById("plan-details-year").style.flexDirection = "column" ; 

        document.getElementById("timeline").value = "Yearly" ; 

    }) ; 

    document.getElementById("type-teller-0").addEventListener("click" , (event)=>{
        event.stopPropagation() ; 

        document.getElementById("type-teller-0").style.opacity = "1" ; 
        document.getElementById("type-teller-1").style.opacity = "0.5" ; 
        document.getElementById("type-teller-2").style.opacity = "0.5" ; 
        document.getElementById("type-teller-3").style.opacity = "0.5" ; 

        document.getElementById("triangle-down-0").style.opacity = "1" ; 
        document.getElementById("triangle-down-1").style.opacity = "0" ; 
        document.getElementById("triangle-down-2").style.opacity = "0" ; 
        document.getElementById("triangle-down-3").style.opacity = "0" ;

        var elements = document.querySelectorAll(".Mobile"); 
  
        elements.forEach(function(element) {
            element.style.color = "#1e4c91"; // Change the color to blue
        });

        var classNames = ["Standard", "Basic", "Premium"]; // Add your class names here

        classNames.forEach(function(className) {
            var elements = document.querySelectorAll("." + className); // Select elements with the specific class name
            
            elements.forEach(function(element) {
            element.style.color = "#a6a5a5"; // Change the color to blue
            });
        });
        
        document.getElementById("type").value = "Mobile"
        
        
    })

    document.getElementById("type-teller-3").addEventListener("click" , (event)=>{
        event.stopPropagation() ; 

        document.getElementById("type-teller-0").style.opacity = "0.5" ; 
        document.getElementById("type-teller-1").style.opacity = "0.5" ; 
        document.getElementById("type-teller-2").style.opacity = "0.5" ; 
        document.getElementById("type-teller-3").style.opacity = "1" ; 

        document.getElementById("triangle-down-0").style.opacity = "0" ; 
        document.getElementById("triangle-down-1").style.opacity = "0" ; 
        document.getElementById("triangle-down-2").style.opacity = "0" ; 
        document.getElementById("triangle-down-3").style.opacity = "1" ;
        
        var elements = document.querySelectorAll(".Premium"); 

        elements.forEach(function(element) {
            element.style.color = "#1e4c91"; // Change the color to blue
        });

        var classNames = ["Standard", "Basic", "Mobile"]; // Add your class names here

        classNames.forEach(function(className) {
            var elements = document.querySelectorAll("." + className); // Select elements with the specific class name
            
            elements.forEach(function(element) {
            element.style.color = "#a6a5a5"; // Change the color to blue
            });
        });
        
        document.getElementById("type").value = "Premium" ; 
    })


    document.getElementById("type-teller-1").addEventListener("click" , (event)=>{
        event.stopPropagation() ; 

        document.getElementById("type-teller-0").style.opacity = "0.5" ; 
        document.getElementById("type-teller-1").style.opacity = "1" ; 
        document.getElementById("type-teller-2").style.opacity = "0.5" ; 
        document.getElementById("type-teller-3").style.opacity = "0.5" ; 

        document.getElementById("triangle-down-0").style.opacity = "0" ; 
        document.getElementById("triangle-down-1").style.opacity = "1" ; 
        document.getElementById("triangle-down-2").style.opacity = "0" ; 
        document.getElementById("triangle-down-3").style.opacity = "0" ; 

        var elements = document.querySelectorAll(".Basic"); 

        elements.forEach(function(element) {
            element.style.color = "#1e4c91"; // Change the color to blue
        });

        var classNames = ["Standard", "Premium", "Mobile"]; // Add your class names here

        classNames.forEach(function(className) {
            var elements = document.querySelectorAll("." + className); // Select elements with the specific class name
            
            elements.forEach(function(element) {
            element.style.color = "#a6a5a5"; // Change the color to blue
            });
        });
        
        document.getElementById("type").value = "Basic" ; 
        
    })


    document.getElementById("type-teller-2").addEventListener("click" , (event)=>{
        event.stopPropagation() ; 

        document.getElementById("type-teller-0").style.opacity = "0.5" ; 
        document.getElementById("type-teller-1").style.opacity = "0.5" ; 
        document.getElementById("type-teller-2").style.opacity = "1" ; 
        document.getElementById("type-teller-3").style.opacity = "0.5" ; 

        document.getElementById("triangle-down-0").style.opacity = "0" ; 
        document.getElementById("triangle-down-1").style.opacity = "0" ; 
        document.getElementById("triangle-down-2").style.opacity = "1" ; 
        document.getElementById("triangle-down-3").style.opacity = "0" ; 
        

        var elements = document.querySelectorAll(".Standard"); 

        elements.forEach(function(element) {
            element.style.color = "#1e4c91"; // Change the color to blue
        });

        var classNames = ["Basic", "Premium", "Mobile"]; // Add your class names here

        classNames.forEach(function(className) {
            var elements = document.querySelectorAll("." + className); // Select elements with the specific class name
            
            elements.forEach(function(element) {
            element.style.color = "#a6a5a5"; // Change the color to blue
            });
        });
        


        document.getElementById("type").value = "Standard" ; 


    })
    


})();  