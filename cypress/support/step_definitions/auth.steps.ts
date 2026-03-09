import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { LoginPage } from '../pages/LoginPage';
import { NavPage } from '../pages/NavPage';

const loginPage = new LoginPage();
const navPage = new NavPage();

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
  navPage.openMenu();
});

When('I click logout', () => {
  navPage.logout();
});

Then('I should be on the inventory page', () => {
  cy.url().should('include', '/inventory.html');
  navPage.getInventoryList().should('be.visible');
});

Then('I should be on the login page', () => {
  cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
  loginPage.getLoginButton().should('be.visible');
});

Then('I should see a login error containing {string}', (message: string) => {
  loginPage.getError().should('contain.text', message);
});
