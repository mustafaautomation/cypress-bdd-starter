import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';

const loginPage = new LoginPage();

Given('I am on the login page', () => {
  loginPage.visit();
});

When(
  'I login with username {string} and password {string}',
  (username: string, password: string) => {
    loginPage.login(username, password);
  },
);

When('I open the navigation menu', () => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('#logout_sidebar_link').should('be.visible');
});

When('I click logout', () => {
  cy.get('#logout_sidebar_link').click();
});

Then('I should be on the inventory page', () => {
  cy.url().should('include', '/inventory.html');
  cy.get('.inventory_list').should('be.visible');
});

Then('I should be on the login page', () => {
  cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  cy.get('[data-test="login-button"]').should('be.visible');
});

Then('I should see a login error containing {string}', (message: string) => {
  loginPage.getError().should('contain.text', message);
});
