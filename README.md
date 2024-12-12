# Mu API - Backend Application with Nx Monorepo and NestJS

Welcome to mu API, a backend application showcasing the power of Nx Monorepo combined with NestJS. This project serves as a blueprint for building scalable, modular, and maintainable backend systems. By leveraging the strengths of Nx, we focus on efficient development, code reusability, and seamless scaling of microservices.

## Why Nx Monorepo?

Using Nx in a monorepo setup offers several key benefits:

1. Centralized Codebase:

   • Manage multiple applications and libraries in a single repository.
   • Keep all shared libraries (e.g., database, redis) in a libs folder to promote DRY (Don’t Repeat Yourself) principles.

2. Code Sharing and Reusability:

   • Shared modules like database configurations, Redis setup, and Firebase utilities are implemented once and reused across all services.
   • This ensures consistency and reduces duplication.

3. Efficient Dependency Graph:

   • Nx automatically analyzes and tracks dependencies between apps and libraries.
   • It ensures that changes are tested and built only where necessary, saving time during CI/CD processes.

4. Scalability:

   • Adding new applications or services to the system is straightforward.
   • Each service can be developed, tested, and deployed independently, enabling a microservices-like architecture within a single repo.

5. Developer Productivity:

   • Nx provides powerful generators for scaffolding apps, libraries, and modules.
   • Integrated task scheduling and caching speed up builds and tests.

## Why NestJS?

The mu API uses NestJS to benefit from:

- Modular Architecture: NestJS encourages modular design, which aligns well with Nx’s monorepo philosophy.
- Out-of-the-Box Support: Built-in support for TypeScript, dependency injection, and extensibility makes it ideal for building robust APIs.
- Integrations: Seamless integration with TypeORM, Redis, and other popular libraries simplifies backend development.

# Application Overview

## Features

mu app: Demonstrates a modular API with the following modules:

- Auth Module: Passwordless authentication using OTP (email-based).
- User Module: User profile management:
- View and update profiles.
- Post Module: Users can:
  - Create posts.
  - React to posts.
  - Add comments to posts.

## Project Structure

### Key Directories

```
├── apps/
│   └── mu/                     # Main application
│       ├── src/
│       │   ├── auth/           # Auth module
│       │   ├── user/           # User module
│       │   └── post/           # Post module
│       └── main.ts             # NestJS application entry point
├── libs/
│   └───|── database/           # MySQL TypeORM setup
│       ├── redis/              # Redis configuration
│       ├── firebase/           # Firebase utilities
└── nx.json                     # Nx configuration file
```

## Benefits of This Setup

1. Ease of Adding New Services:

   • Generate a new NestJS application:

   ```
   nx generate @nrwl/nest:application <app-name>
   ```

   • Integrate shared libraries:

   ```
   import { DatabaseModule } from '@libs/database';
   ```

2. Cross-Service Communication:
   - Shared libraries like ``@libs/redis`` facilitate inter-service communication.
3. Testing Efficiency:
   - Nx ensures that only affected services and libraries are tested, reducing overhead.
4. Future-Proof Design:
   - Add more services (e.g., notifications, analytics) without altering the existing codebase significantly.

## Setup Instructions

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd mu-backend
   ```
2. Install dependencies:

   ```
   npm install
   ```

3. Configure environment variables:
   • Copy .env.example to .env:

   ```
   cp .env.example .env
   ```

   • Update database, Redis, and other configurations.

4. Run database migrations:

   ```
   nx run mu:migrate
   ```

5. Start the development server:

   ```
   nx serve mu
   ```

6. Access API documentation:
    Swagger is available at http://localhost:3000/api/docs.

## Adding New Applications or Libraries

### Adding an Application

Generate a new NestJS service:

```
nx generate @nrwl/nest:application <app-name>
```

### Adding a Shared Library

Create a reusable library:

```
nx generate @nrwl/workspace:library <lib-name>
```

For example, to add a notification library:

```
nx generate @nrwl/workspace:library notification
```

Export shared logic via the library:

```
export * from './notification.service';
```

## Conclusion

This project demonstrates how Nx Monorepo and NestJS can be combined to build robust, modular, and scalable backend systems. By leveraging shared libraries, efficient dependency management, and the extensibility of Nx, we can create a future-proof architecture for microservices and beyond.

For questions or contributions, feel free to reach out.
