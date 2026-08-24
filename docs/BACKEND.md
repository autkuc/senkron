# Backend Specification (`backend/`)

## Overview

The `backend/` directory handles incoming traffic, rate limiting, and request processing via REST and GraphQL.

## Features

1. **Routers & Request Handling**:
   - Modular routing layer handling API requests from web components and third-party integrations.

2. **Rate Limiting**:
   - Middleware to prevent API abuse, token exhaustion on AI endpoints, and denial of service.

3. **REST & GraphQL Support**:
   - REST endpoints for binary asset uploads and lightweight web component interactions.
   - GraphQL server for query-based post generation, structured metadata, and flexible data fetching.
