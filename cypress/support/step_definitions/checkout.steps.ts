import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

Given('I am viewing the cart', () => {
  cartPage.visit();
});

When('I proceed to checkout', () => {
  cartPage.checkout();
});

When(
  'I enter first name {string}, last name {string}, postal code {string}',
  (firstName: string, lastName: string, postalCode: string) => {
    checkoutPage.fillInfo(firstName, lastName, postalCode);
  },
);

When('I continue to the order summary', () => {
  checkoutPage.continue();
});

When('I place the order', () => {
  checkoutPage.finish();
});

Then('I should see the confirmation {string}', (message: string) => {
  checkoutPage.getCompleteHeader().should('contain.text', message);
  cy.url().should('include', '/checkout-complete.html');
});

Then('the order total should equal subtotal plus tax', () => {
  checkoutPage.getSubtotal().then((subtotal) => {
    checkoutPage.getTax().then((tax) => {
      checkoutPage.getTotal().then((total) => {
        expect(total).to.be.closeTo(subtotal + tax, 0.01);
      });
    });
  });
});

Then('I should see a checkout error {string}', (message: string) => {
  checkoutPage.getError().should('contain.text', message);
});
