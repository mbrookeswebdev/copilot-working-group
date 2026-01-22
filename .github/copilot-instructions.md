# Copilot Working Group Workshops Repository

## Repository Summary

This repository hosts hands-on workshops for learning and practicing GitHub Copilot. It demonstrates Copilot Chat usage in GitHub UI, Copilot in VSCode, and custom agents through a React-based web application.

## Technology Stack

- **Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite 7.2
- **Runtime**: Node.js 20
- **Routing**: TanStack Router 1.140
- **State Management**: TanStack Query 5.90
- **Testing**: Vitest 4.0 with Testing Library and jsdom
- **Linting**: ESLint 9.39 with TypeScript ESLint
- **Type Checking**: TypeScript 5.9

## Bootstrap and Setup Instructions

### First Time Setup

1. **Install Dependencies** (always run after cloning):
   ```bash
   npm ci
   ```
   - Use `npm ci` for clean installs (faster and more reliable than `npm install`)
   - Takes approximately 7-10 seconds on typical hardware
   - Installs 378+ packages

2. **Enable GitHub Actions** (for forked repositories):
   - Navigate to the Actions tab in your forked repository
   - Click the green "I understand my workflows, go ahead and enable them" button

3. **Enable Issues** (for forked repositories):
   - Go to Settings → General
   - Scroll to the "Features" section
   - Check the "Issues" checkbox

## Build Instructions

### Development Build
```bash
npm run dev
```
- Starts Vite development server with hot module replacement
- Default URL: http://localhost:5173
- Uses React Compiler for optimization

### Production Build
```bash
npm run build
```
- Runs TypeScript compilation first (`tsc -b`)
- Then runs Vite build
- **IMPORTANT**: Currently has TypeScript errors related to `useCartContext` exports. The build will fail until these are resolved.
- Output directory: `dist/`
- Build time: ~5-15 seconds

### Preview Production Build
```bash
npm run preview
```
- Previews the production build locally
- Must run `npm run build` first

## Testing Instructions

### Run All Tests
```bash
npm test -- --run
```
- Runs all tests in run mode (non-watch)
- Uses Vitest with jsdom environment
- Test setup file: `src/test/setup.ts`
- Duration: ~1.5 seconds
- Currently has 1 test file (`ProductDetail.test.tsx`) with 4 test cases

### Run Tests in Watch Mode
```bash
npm test
```
- Automatically re-runs tests on file changes

### Run Tests with UI
```bash
npm run test:ui
```
- Opens Vitest UI in the browser for interactive test exploration

### Run Tests with Coverage
```bash
npm run test:coverage
```
- Generates code coverage report

## Linting Instructions

### Check for Lint Errors
```bash
npm run lint
```
- Uses ESLint with TypeScript parser
- Configuration file: `eslint.config.js`
- Checks all TypeScript and JavaScript files
- Duration: ~2-3 seconds

### Auto-fix Lint Errors
```bash
npm run lint:fix
```
- Automatically fixes fixable ESLint errors

## Project Structure

### Root Files
- `index.html` - Main HTML entry point
- `package.json` - Dependencies and scripts
- `vite.config.ts` - Vite and Vitest configuration
- `eslint.config.js` - ESLint configuration
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript config
- `tsconfig.node.json` - Node-specific TypeScript config

### Source Directory (`src/`)
- `main.tsx` - Application entry point
- `index.css` - Global styles
- `routeTree.gen.ts` - Auto-generated TanStack Router routes
- `components/` - React components
  - `Header/` - Header component
  - `ProductCard/` - Product card component
  - `ProductDetail/` - Product detail component (has tests)
  - `ProductActions/` - Product action buttons
- `contexts/` - React contexts
  - `CartContext` - Shopping cart state management
- `hooks/` - Custom React hooks
- `routes/` - TanStack Router route components
- `services/` - API and service layer
- `test/` - Test setup and utilities
  - `setup.ts` - Vitest setup file
- `types/` - TypeScript type definitions

### Assets Directory (`assets/`)
- `images/` - Static images used in documentation

### GitHub Directory (`.github/`)
- `workflows/` - GitHub Actions CI/CD workflows
  - `lint.yml` - CI workflow for linting and testing

## CI/CD Workflow

The repository uses GitHub Actions for continuous integration:

### Workflow: CI (`lint.yml`)
Triggers on: Pull requests

**Jobs:**
1. **lint** - Runs on ubuntu-latest with Node.js 20
   - Checks out code
   - Sets up Node.js with npm cache
   - Runs `npm ci` to install dependencies
   - Runs `npm run lint` to check code quality

2. **test** - Runs on ubuntu-latest with Node.js 20
   - Checks out code
   - Sets up Node.js with npm cache
   - Runs `npm ci` to install dependencies
   - Runs `npm test -- --run` to execute tests

**Requirements for PR Success:**
- All lint checks must pass
- All tests must pass

## Known Issues

1. **Build Failures**: The production build currently fails due to TypeScript errors:
   - Components are importing `useCartContext` from `'../../contexts/CartContext'`
   - However, `useCartContext` is exported from a separate file: `src/contexts/useCartContext.ts`
   - Affected components: `Header`, `ProductActions`, and `ProductCard`
   - **Fix**: Import from `'../../contexts/useCartContext'` instead
   - Tests still pass, but `npm run build` will fail until this is fixed

2. **Security Vulnerabilities**: npm reports 3 vulnerabilities (1 low, 2 high)
   - Run `npm audit` for details
   - Run `npm audit fix` to attempt automatic fixes

## Development Workflow

1. **Before making changes**: Always run `npm ci` to ensure dependencies are up to date
2. **During development**: Use `npm run dev` for hot reload
3. **Before committing**: 
   - Run `npm run lint` to check code style
   - Run `npm test -- --run` to verify tests pass
   - Consider running `npm run build` to catch TypeScript errors early (note: currently fails)
4. **For pull requests**: The CI workflow will automatically run lint and test checks

## Important Notes

- Always use `npm ci` instead of `npm install` for dependency installation to ensure consistency
- The TanStack Router generates `routeTree.gen.ts` automatically - do not edit this file manually
- React Compiler is enabled via Babel plugin for performance optimization
- The development server uses Vite's fast HMR (Hot Module Replacement)
- Test files should be co-located with components (e.g., `ProductDetail.test.tsx` next to `ProductDetail/`)
