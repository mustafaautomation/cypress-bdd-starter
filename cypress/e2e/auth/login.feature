@auth
Feature: User Authentication

  Background:
    Given I am on the login page

  @smoke
  Scenario: Successful login with valid credentials
    When I login with username "standard_user" and password "secret_sauce"
    Then I should be on the inventory page

  @regression
  Scenario: Login fails with invalid credentials
    When I login with username "invalid_user" and password "wrong_pass"
    Then I should see a login error containing "Username and password do not match"

  @regression
  Scenario: Login fails for locked out user
    When I login with username "locked_out_user" and password "secret_sauce"
    Then I should see a login error containing "locked out"

  @regression
  Scenario Outline: Login fails when required fields are empty
    When I login with username "<username>" and password "<password>"
    Then I should see a login error containing "<error>"

    Examples:
      | username      | password     | error                |
      |               | secret_sauce | Username is required |
      | standard_user |              | Password is required |

  @smoke @regression
  Scenario: User can logout successfully
    When I login with username "standard_user" and password "secret_sauce"
    And I open the navigation menu
    And I click logout
    Then I should be on the login page
