@checkout
Feature: Checkout Flow

  Background:
    Given I am logged in as a standard user
    And I have added "Sauce Labs Backpack" to the cart
    And I am viewing the cart

  @smoke @regression
  Scenario: User completes a full purchase successfully
    When I proceed to checkout
    And I enter first name "John", last name "Doe", postal code "12345"
    And I continue to the order summary
    And I place the order
    Then I should see the confirmation "Thank you for your order"

  @regression
  Scenario: Checkout order total is correct
    When I proceed to checkout
    And I enter first name "John", last name "Doe", postal code "12345"
    And I continue to the order summary
    Then the order total should equal subtotal plus tax

  @regression
  Scenario Outline: Checkout fails when required fields are missing
    When I proceed to checkout
    And I enter first name "<firstName>", last name "<lastName>", postal code "<postalCode>"
    And I continue to the order summary
    Then I should see a checkout error "<error>"

    Examples:
      | firstName | lastName | postalCode | error                  |
      |           | Doe      | 12345      | First Name is required |
      | John      |          | 12345      | Last Name is required  |
      | John      | Doe      |            | Postal Code is required|
