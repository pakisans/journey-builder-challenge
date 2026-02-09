# Journey Builder – React Coding Challenge

Small React app that:

- Fetches a form dependency graph from a mock API
- Renders a list of form nodes
- Allows viewing and editing prefill mappings for form fields

## Tech

- React + TypeScript
- Vite
- Vitest
- Tailwind CSS (minimal usage)

## Run locally

```bash
npm install
npm run dev
```

## Mock server

This app expects the Avantos challenge mock server to be running and exposing
the action blueprint graph endpoint on `http://localhost:3000`

## Prefill data sources

Prefill options are provided by pluggable data sources.

Enabled sources are selected via environment configuration:

```bash
VITE_PREFILL_SOURCES=direct-upstream,transitive-upstream,global
```

To add a new source, implement a provider and register it in the source registry

## Tests

Unit tests are implemented using Vitest.

```bash
npm run test
```
