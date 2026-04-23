Feature: Ecommerce validations
    @Regression
  Scenario: Placing the Order
    Given a login to Ecommerce application with "aniket.pathak4@gmail.com" and "Learning@123"
    When Add "ZARA COAT 3" to Cart
    Then verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details "ind", "India" and Place the Order with coupon code "rahulshettyacademy"
    Then Verify order in present in the OrderHistory