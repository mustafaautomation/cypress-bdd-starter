/**
 * Custom Cypress commands.
 * loginAsStandardUser uses cy.session() to authenticate once and cache
 * the session — no repeated logins between tests.
 */

export {};

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginAsStandardUser(): void;
    }
  }
}

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.session(
    'standard-user',
    () => {
      cy.visit('/');
      cy.get('[data-test="username"]').type(Cypress.env('STANDARD_USER') || 'standard_user');
      cy.get('[data-test="password"]').type(Cypress.env('PASSWORD') || 'secret_sauce');
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    },
    {
      validate() {
        cy.visit('/inventory.html');
        cy.url().should('include', '/inventory.html');
      },
    },
  );
});
