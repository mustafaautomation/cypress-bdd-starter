export class NavPage {
  private selectors = {
    menuButton: '#react-burger-menu-btn',
    logoutLink: '#logout_sidebar_link',
    closeMenuButton: '#react-burger-cross-btn',
    inventoryList: '.inventory_list',
  };

  openMenu(): void {
    cy.get(this.selectors.menuButton).click();
    cy.get(this.selectors.logoutLink).should('be.visible');
  }

  logout(): void {
    cy.get(this.selectors.logoutLink).click();
  }

  getInventoryList(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.inventoryList);
  }
}
