export class LoginPage {
  private selectors = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
    loginButton: '[data-test="login-button"]',
    error: '[data-test="error"]',
  };

  visit(): void {
    cy.visit('/');
  }

  login(username: string, password: string): void {
    cy.get(this.selectors.username).clear();
    if (username) cy.get(this.selectors.username).type(username);

    cy.get(this.selectors.password).clear();
    if (password) cy.get(this.selectors.password).type(password);

    cy.get(this.selectors.loginButton).click();
  }

  getError(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.error);
  }

  getLoginButton(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.loginButton);
  }
}
