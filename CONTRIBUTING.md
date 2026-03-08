# Contributing to Cypress BDD Starter

## Getting Started

```bash
git clone https://github.com/mustafaautomation/cypress-bdd-starter.git
cd cypress-bdd-starter
npm install
npm run open
```

## Development

```bash
npm test              # Run all scenarios headless
npm run test:smoke    # Smoke tagged scenarios only
npm run open          # Cypress interactive mode
npm run typecheck     # Type checking
npm run lint          # ESLint
npm run format:check  # Prettier
```

## Adding New Features

1. Create `.feature` file in `cypress/e2e/<feature>/`
2. Add step definitions in `cypress/support/step_definitions/`
3. Add Page Objects in `cypress/support/pages/` if needed
4. Tag scenarios with `@smoke` or `@regression`

## Pull Request Process

1. Create a feature branch from `main`
2. Ensure all checks pass: `npm run typecheck && npm run lint`
3. Submit PR using the provided template
