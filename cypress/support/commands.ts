/**
 * Custom Cypress commands.
 * loginAsStandardUser uses cy.session() to authenticate once and cache
 * the session — no repeated logins between tests.
 */

export {};

declare global {
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
      // Cypress 16: public values come from Cypress.expose(); secrets are read with cy.env(),
      // which keeps them out of the browser bundle and the command log.
      cy.visit('/');
      cy.get('[data-test="username"]').type(Cypress.expose('STANDARD_USER') || 'standard_user');
      cy.env(['PASSWORD']).then(({ PASSWORD }) => {
        cy.get('[data-test="password"]').type(PASSWORD || 'secret_sauce', { log: false });
      });
      cy.get('[data-test="login-button"]').click();
      cy.url().should('include', '/inventory.html');
    },
    {
      validate() {
        // SauceDemo's static host answers deep links with HTTP 404 but still serves the app,
        // so don't fail on the status code; check that the logged-in page actually rendered.
        cy.visit('/inventory.html', { failOnStatusCode: false });
        cy.url().should('include', '/inventory.html');
        cy.get('[data-test="inventory-list"]').should('be.visible');
      },
    },
  );
});
