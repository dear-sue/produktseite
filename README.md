# produktseite

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
### Getting started

# Repository klonen
git clone https://github.com/dein-benutzername/dein-repo-name.git
cd dein-repo-name

# Abhängigkeiten installieren
npm install

# Entwicklungsserver starten
ng serve

# Für die Produktion bauen
ng build

---

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

