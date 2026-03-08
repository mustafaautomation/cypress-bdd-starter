# cypress-bdd-starter

> Cypress + Cucumber BDD framework with TypeScript POM — demonstrating how QA teams collaborate using human-readable feature files.

[![Smoke Tests](https://github.com/mustafaautomation/cypress-bdd-starter/actions/workflows/smoke.yml/badge.svg)](https://github.com/mustafaautomation/cypress-bdd-starter/actions/workflows/smoke.yml)
[![Regression Tests](https://github.com/mustafaautomation/cypress-bdd-starter/actions/workflows/regression.yml/badge.svg)](https://github.com/mustafaautomation/cypress-bdd-starter/actions/workflows/regression.yml)
[![License: MIT](https://img.shields.io/github/license/mustafaautomation/cypress-bdd-starter)](https://github.com/mustafaautomation/cypress-bdd-starter/blob/main/LICENSE)
[![Cypress](https://img.shields.io/badge/tested%20with-Cypress-04C38E?logo=cypress&logoColor=white)](https://www.cypress.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

---

## Why BDD?

BDD bridges the gap between developers, QA, and product owners. Feature files written in plain English let non-technical stakeholders review and contribute to test coverage — no code required.

```gherkin
Scenario: User completes a full purchase
  Given I am logged in as a standard user
  And I have added "Sauce Labs Backpack" to the cart
  When I proceed to checkout
  And I enter first name "John", last name "Doe", postal code "12345"
  And I place the order
  Then I should see the confirmation "Thank you for your order"
```

---

## Stack

| Tool | Purpose |
|---|---|
| [Cypress](https://cypress.io) 13+ | Test runner |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | Gherkin + step definitions |
| TypeScript | Type-safe step definitions and POM |
| GitHub Actions | CI with Cypress official action |
| SauceDemo | Target application |

---

## Architecture

```
cypress-bdd-starter/
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.feature          # Login scenarios in Gherkin
│   │   ├── inventory/
│   │   │   └── inventory.feature      # Product & cart scenarios
│   │   └── checkout/
│   │       └── checkout.feature       # Purchase flow scenarios
│   └── support/
│       ├── pages/                     # Page Object Models
│       │   ├── LoginPage.ts
│       │   ├── InventoryPage.ts
│       │   ├── CartPage.ts
│       │   └── CheckoutPage.ts
│       ├── step_definitions/          # Gherkin → Cypress mappings
│       │   ├── auth.steps.ts
│       │   ├── inventory.steps.ts
│       │   └── checkout.steps.ts
│       ├── commands.ts                # Custom commands (loginAsStandardUser)
│       └── e2e.ts                     # Support file entry point
├── cypress.config.ts
└── .github/workflows/
    ├── smoke.yml                      # PR checks
    └── regression.yml                 # Merge + nightly
```

---

## Quick Start

```bash
git clone https://github.com/mustafaautomation/cypress-bdd-starter.git
cd cypress-bdd-starter

npm install
cp .env.example .env

# Run smoke tests
npm run test:smoke

# Run full regression
npm run test:regression

# Open interactive test runner
npm run open
```

---

## Test Commands

| Command | Description |
|---|---|
| `npm test` | All scenarios, headless |
| `npm run test:smoke` | `@smoke` tagged scenarios only |
| `npm run test:regression` | `@regression` tagged scenarios |
| `npm run test:headed` | Run with visible browser |
| `npm run open` | Cypress interactive mode |

---

## Feature Coverage

| Feature | Scenarios | Tags |
|---|---|---|
| Authentication | Login, logout, error states, field validation | `@smoke` `@regression` |
| Inventory | Product count, all 4 sort modes, add to cart | `@smoke` `@regression` |
| Checkout | Full flow, total validation, missing field errors | `@smoke` `@regression` |

---

## Key Patterns

### Session Caching
`cy.loginAsStandardUser()` uses `cy.session()` to authenticate once and reuse the session — identical concept to Playwright's `storageState`. No repeated logins between tests.

### Scenario Outlines
Data-driven scenarios with `Examples` tables keep tests DRY:
```gherkin
Scenario Outline: Checkout fails when required fields are missing
  When I enter first name "<firstName>", last name "<lastName>", postal code "<postalCode>"
  Then I should see a checkout error "<error>"

  Examples:
    | firstName | lastName | postalCode | error                   |
    |           | Doe      | 12345      | First Name is required  |
    | John      |          | 12345      | Last Name is required   |
```

---

---

Built by [Quvantic](https://quvantic.com)
