export class CheckoutPage {
  private selectors = {
    firstName: '[data-test="firstName"]',
    lastName: '[data-test="lastName"]',
    postalCode: '[data-test="postalCode"]',
    continueButton: '[data-test="continue"]',
    finishButton: '[data-test="finish"]',
    error: '[data-test="error"]',
    completeHeader: '[data-test="complete-header"]',
    subtotalLabel: '.summary_subtotal_label',
    taxLabel: '.summary_tax_label',
    totalLabel: '[data-test="total-label"]',
  };

  fillInfo(firstName: string, lastName: string, postalCode: string): void {
    cy.get(this.selectors.firstName).clear();
    if (firstName) cy.get(this.selectors.firstName).type(firstName);

    cy.get(this.selectors.lastName).clear();
    if (lastName) cy.get(this.selectors.lastName).type(lastName);

    cy.get(this.selectors.postalCode).clear();
    if (postalCode) cy.get(this.selectors.postalCode).type(postalCode);
  }

  continue(): void {
    cy.get(this.selectors.continueButton).click();
  }

  finish(): void {
    cy.get(this.selectors.finishButton).click();
  }

  getError(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.error);
  }

  getCompleteHeader(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.completeHeader);
  }

  getSubtotal(): Cypress.Chainable<number> {
    return cy
      .get(this.selectors.subtotalLabel)
      .invoke('text')
      .then((text) => parseFloat(text.replace(/[^0-9.]/g, '')));
  }

  getTax(): Cypress.Chainable<number> {
    return cy
      .get(this.selectors.taxLabel)
      .invoke('text')
      .then((text) => parseFloat(text.replace(/[^0-9.]/g, '')));
  }

  getTotal(): Cypress.Chainable<number> {
    return cy
      .get(this.selectors.totalLabel)
      .invoke('text')
      .then((text) => parseFloat(text.replace(/[^0-9.]/g, '')));
  }
}
