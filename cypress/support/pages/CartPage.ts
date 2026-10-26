export class CartPage {
  private selectors = {
    items: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
    continueButton: '[data-test="continue-shopping"]',
  };

  visit(): void {
    // SauceDemo returns HTTP 404 for SPA deep links while still rendering the page.
    cy.visit('/cart.html', { failOnStatusCode: false });
    cy.get('[data-test="cart-list"]').should('exist');
  }

  checkout(): void {
    cy.get(this.selectors.checkoutButton).click();
  }

  continueShopping(): void {
    cy.get(this.selectors.continueButton).click();
  }

  getItemCount(): Cypress.Chainable<number> {
    return cy.get(this.selectors.items).its('length');
  }
}
