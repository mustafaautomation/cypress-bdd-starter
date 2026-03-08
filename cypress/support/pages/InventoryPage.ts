export class InventoryPage {
  private selectors = {
    items: '.inventory_item',
    itemName: '.inventory_item_name',
    itemPrice: '.inventory_item_price',
    sortSelect: '[data-test="product-sort-container"]',
    cartBadge: '.shopping_cart_badge',
    cartLink: '.shopping_cart_link',
  };

  visit(): void {
    cy.visit('/inventory.html');
  }

  getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.selectors.items).its('length');
  }

  getProductNames(): Cypress.Chainable<string[]> {
    return cy
      .get(this.selectors.itemName)
      .then(($els) => [...$els].map((el) => el.textContent?.trim() ?? ''));
  }

  getProductPrices(): Cypress.Chainable<number[]> {
    return cy
      .get(this.selectors.itemPrice)
      .then(($els) => [...$els].map((el) => parseFloat(el.textContent?.replace('$', '') ?? '0')));
  }

  sortBy(label: string): void {
    const map: Record<string, string> = {
      'Name (A to Z)': 'az',
      'Name (Z to A)': 'za',
      'Price (low to high)': 'lohi',
      'Price (high to low)': 'hilo',
    };
    cy.get(this.selectors.sortSelect).select(map[label] ?? label);
  }

  addToCartByName(productName: string): void {
    cy.get(this.selectors.items)
      .filter(`:has(.inventory_item_name:contains("${productName}"))`)
      .find('[data-test^="add-to-cart"]')
      .click();
  }

  getCartCount(): Cypress.Chainable<string> {
    return cy.get(this.selectors.cartBadge).invoke('text');
  }

  goToCart(): void {
    cy.get(this.selectors.cartLink).click();
  }
}
