@inventory
Feature: Product Inventory

  Background:
    Given I am logged in as a standard user
    And I am on the inventory page

  @smoke
  Scenario: Inventory displays all 6 products
    Then I should see 6 products

  @regression
  Scenario: Products can be sorted A to Z
    When I sort products by "Name (A to Z)"
    Then the products should be sorted alphabetically ascending

  @regression
  Scenario: Products can be sorted Z to A
    When I sort products by "Name (Z to A)"
    Then the products should be sorted alphabetically descending

  @regression
  Scenario: Products can be sorted by price low to high
    When I sort products by "Price (low to high)"
    Then the product prices should be in ascending order

  @regression
  Scenario: Products can be sorted by price high to low
    When I sort products by "Price (high to low)"
    Then the product prices should be in descending order

  @smoke @regression
  Scenario: User can add a product to the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"

  @regression
  Scenario: User can add multiple products to the cart
    When I add "Sauce Labs Backpack" to the cart
    And I add "Sauce Labs Bike Light" to the cart
    Then the cart badge should show "2"

  @regression
  Scenario: User can remove a product from the cart
    When I add "Sauce Labs Backpack" to the cart
    Then the cart badge should show "1"
