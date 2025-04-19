# Produktseite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.8.

A clean and modern Angular project built with **TypeScript** and **Tailwind CSS** to display a list of products in a responsive grid layout. Includes **pagination**, **search filtering**, and a component-based structure using **standalone components**.


# 🛍️ Product Showcase App

A clean and modern Angular project built with **TypeScript** and **Tailwind CSS** to display a list of products in a responsive grid layout.  
Includes **pagination**, **search filtering**, and a component-based structure using **standalone components**.

---

## ✨ Features

- 🔍 **Search Filtering** – Quickly find products by name, brand, or description
- 📦 **Pagination** – Displays 12 products per page for better usability
- 🎨 **Tailwind CSS Styling** – Fully responsive layout with mobile-first design
- 🧩 **Standalone Angular Components** – Clean structure and modular architecture
- 📁 **Static JSON Data** – Loaded via Angular HttpClient

---

## 🧱 Tech Stack

- [Angular 17+](https://angular.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [RxJS](https://rxjs.dev/)

---

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## 📁 Project Structure

```bash
src/
├── app/
│   ├── components/
│   │   ├── product-list/
│   │   └── product-price/
│   ├── pages/
│   │   └── product-page/
│   ├── services/
│   │   └── product.service.ts
│   ├── models/
│   │   └── product.model.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── assets/
│   └── products.json

