Feature: Ecommerce validations

  @ErrorValidation
  @foo
  Scenario Outline: Placing the Order
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error message is displayed

    Examples:
      | username                 | password     |
      | aniket.pathak4@gmail.com | Learning@123 |
      | aniket.pathak2@gmail.com | Learning@123 |