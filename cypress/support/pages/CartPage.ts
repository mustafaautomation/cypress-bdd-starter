export class CartPage {
  private selectors = {
    items: '.cart_item',
    checkoutButton: '[data-test="checkout"]',
    continueButton: '[data-test="continue-shopping"]',
  };

  visit(): void {
    cy.visit('/cart.html');
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
