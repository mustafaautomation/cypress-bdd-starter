# Cypress BDD Starter

[![Smoke Tests](https://github.com/mustafaautomation/cypress-bdd-starter/actions/workflows/smoke.yml/badge.svg)](https://github.com/mustafaautomation/cypress-bdd-starter/actions)
[![Regression Tests](https://github.com/mustafaautomation/cypress-bdd-starter/actions/workflows/regression.yml/badge.svg)](https://github.com/mustafaautomation/cypress-bdd-starter/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933.svg?logo=node.js&logoColor=white)](https://nodejs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6.svg?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED.svg?logo=docker&logoColor=white)](Dockerfile)

Cypress + Cucumber BDD framework with TypeScript Page Object Model. Feature files written in plain English let non-technical stakeholders review and contribute to test coverage. Targets [SauceDemo](https://www.saucedemo.com) as a reference implementation.

---

## Table of Contents

- [Why BDD?](#why-bdd)
- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Stack](#stack)
- [Feature Coverage](#feature-coverage)
- [Key Patterns](#key-patterns)
- [CI/CD Integration](#cicd-integration)
- [Docker](#docker)
- [Project Structure](#project-structure)
- [Development](#development)

---

## Why BDD?

BDD bridges the gap between developers, QA, and product owners. Feature files in plain English let non-technical stakeholders review and contribute to test coverage — no code required.

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

## Architecture

```
+---------------------------------------------------------+
|                  Feature Files (.feature)                |
|         auth/login  |  inventory  |  checkout            |
+---------------------------------------------------------+
|              Step Definitions (Gherkin -> Cypress)        |
|       auth.steps | inventory.steps | checkout.steps      |
+---------------------------------------------------------+
|                Page Object Models                        |
|  LoginPage | NavPage | InventoryPage | CartPage | Checkout|
+---------------------------------------------------------+
|              Cypress + Cucumber Preprocessor              |
|                  (esbuild bundler)                        |
+---------------------------------------------------------+
```

---

## Stack

| Tool | Purpose |
|---|---|
| [Cypress](https://cypress.io) 13+ | Test runner |
| [@badeball/cypress-cucumber-preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor) | Gherkin + step definitions |
| TypeScript | Type-safe step definitions and POM |
| mocha-junit-reporter | JUnit XML test reports |
| GitHub Actions | CI with Cypress official action |
| [SauceDemo](https://www.saucedemo.com) | Target application |

---

## Feature Coverage

| Feature | Scenarios | Tags |
|---|---|---|
| Authentication | 6 — Login, logout, error states, field validation | `@smoke` `@regression` |
| Inventory | 8 — Product count, all 4 sort modes, add to cart, remove from cart | `@smoke` `@regression` |
| Checkout | 5 — Full flow, total validation, missing field errors | `@smoke` `@regression` |

**Total: 19 scenarios** across 3 feature files.

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

### Page Object Model

All selectors live in dedicated POM classes — step definitions stay clean and readable:

- `LoginPage` — Login form interactions
- `NavPage` — Burger menu, logout, navigation chrome
- `InventoryPage` — Product listing, sorting, add/remove cart
- `CartPage` — Cart contents, checkout trigger
- `CheckoutPage` — Checkout form, order summary, price extraction

---

## CI/CD Integration

Two GitHub Actions workflows:

- **Smoke** — Runs on PRs and pushes to main with lint and format gates
- **Regression** — Runs on merge to main + nightly at 3 AM UTC

Both use the official `cypress-io/github-action@v6` with screenshot upload on failure and JUnit XML report generation.

---

## Docker

Build and run tests in a container:

```bash
# Build the image
docker build -t cypress-bdd-starter .

# Run all tests
docker run cypress-bdd-starter

# Run smoke tests only
docker run cypress-bdd-starter --env tags=@smoke

# Run regression tests only
docker run cypress-bdd-starter --env tags=@regression
```

---

## Project Structure

```
cypress-bdd-starter/
├── .github/
│   ├── workflows/
│   │   ├── smoke.yml               # PR + push checks with lint gates
│   │   └── regression.yml          # Merge + nightly regression
│   ├── dependabot.yml              # Automated dependency updates
│   ├── CODEOWNERS                  # Review ownership
│   └── pull_request_template.md    # PR checklist
├── cypress/
│   ├── e2e/
│   │   ├── auth/login.feature      # Login scenarios in Gherkin
│   │   ├── inventory/inventory.feature
│   │   └── checkout/checkout.feature
│   ├── fixtures/
│   │   └── products.json           # Product data fixture
│   └── support/
│       ├── pages/                  # Page Object Models
│       │   ├── LoginPage.ts
│       │   ├── NavPage.ts
│       │   ├── InventoryPage.ts
│       │   ├── CartPage.ts
│       │   └── CheckoutPage.ts
│       ├── step_definitions/       # Gherkin → Cypress mappings
│       │   ├── auth.steps.ts
│       │   ├── inventory.steps.ts
│       │   └── checkout.steps.ts
│       ├── commands.ts             # Custom commands
│       └── e2e.ts                  # Support file entry point
├── cypress.config.ts
├── CONTRIBUTING.md
├── SECURITY.md
├── Dockerfile
└── .dockerignore
```

---

## Development

```bash
git clone https://github.com/mustafaautomation/cypress-bdd-starter.git
cd cypress-bdd-starter
npm install
npm run open           # Interactive mode
npm run typecheck      # Type checking
npm run lint           # ESLint
npm run format:check   # Prettier
```

---

## License

MIT

---

Built by [Quvantic](https://quvantic.com)
