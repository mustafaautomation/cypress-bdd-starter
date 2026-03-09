import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { InventoryPage } from '../pages/InventoryPage';

const inventoryPage = new InventoryPage();

Given('I am logged in as a standard user', () => {
  cy.loginAsStandardUser();
});

Given('I am on the inventory page', () => {
  inventoryPage.visit();
});

Given('I have added {string} to the cart', (productName: string) => {
  inventoryPage.visit();
  inventoryPage.addToCartByName(productName);
});

When('I sort products by {string}', (sortLabel: string) => {
  inventoryPage.sortBy(sortLabel);
});

When('I add {string} to the cart', (productName: string) => {
  inventoryPage.addToCartByName(productName);
});

Then('I should see {int} products', (count: number) => {
  inventoryPage.getProductCount().should('eq', count);
});

Then('the products should be sorted alphabetically ascending', () => {
  inventoryPage.getProductNames().then((names) => {
    const sorted = [...names].sort();
    expect(names).to.deep.equal(sorted);
  });
});

Then('the products should be sorted alphabetically descending', () => {
  inventoryPage.getProductNames().then((names) => {
    const sorted = [...names].sort().reverse();
    expect(names).to.deep.equal(sorted);
  });
});

Then('the product prices should be in ascending order', () => {
  inventoryPage.getProductPrices().then((prices) => {
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).to.be.lte(prices[i + 1]);
    }
  });
});

Then('the product prices should be in descending order', () => {
  inventoryPage.getProductPrices().then((prices) => {
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).to.be.gte(prices[i + 1]);
    }
  });
});

When('I remove {string} from the cart', (productName: string) => {
  inventoryPage.removeFromCartByName(productName);
});

Then('the cart badge should show {string}', (count: string) => {
  cy.get('.shopping_cart_badge').should('have.text', count);
});

Then('the cart badge should not be visible', () => {
  cy.get('.shopping_cart_badge').should('not.exist');
});
