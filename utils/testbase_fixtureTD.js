const base = require('@playwright/test')

exports.customTest = base.test.extend(
    {
        testDataForOrder : {

            username : "aniket.pathak2@gmail.com",
            password : "Learning@123",
            productName :"ZARA COAT 3",
            countryCode : "ind",
            countryName : "India",
            couponCode: "rahulshettyacademy"
        }
        
    }
)