# NexaCart

NexaCart is a responsive, production-style e-commerce frontend built with React, Vite, Tailwind CSS, Redux Toolkit, and React Router. It delivers a complete shopping experience with product discovery, filtering, wishlist, persistent cart, authentication UI, and a multi-step checkout flow.

## Project Overview

This project was developed as a modern frontend reference implementation for an e-commerce application. The goal is to demonstrate clean component-based architecture, responsive UI design, centralized state management, API integration, and practical user flows expected in an online shopping platform.

## Key Features

- Responsive storefront homepage with offer banner, category navigation, and trust badges
- Product catalog with search, category filter, price filter, rating filter, and sorting
- Product detail page with pricing, rating, stock, delivery, and wishlist actions
- Persistent shopping cart using Redux Toolkit and localStorage
- Cart drawer with quantity controls, item removal, subtotal, shipping, and total calculation
- Wishlist management with persistent saved products
- Login and register UI with demo JWT-style local session handling
- Multi-step checkout flow with customer, delivery, and payment sections
- Form validation using React Hook Form and Yup
- API-style product loading with Axios and local fallback product data
- Mobile-first responsive layout using Tailwind CSS
- Production build support with Vite

## Tech Stack

| Technology | Purpose |
| --- | --- |
| React | Component-based frontend UI |
| Vite | Fast development server and production build tooling |
| Tailwind CSS | Utility-first responsive styling |
| Redux Toolkit | Global state management for products, cart, wishlist, and auth |
| React Redux | React bindings for Redux state |
| React Router | Client-side routing |
| Axios | API-style product data loading |
| React Hook Form | Form state handling |
| Yup | Form validation schemas |
| Lucide React | Icon system |
| Oxlint | Code linting |

## Pages and Flows

- `/` - Storefront and product catalog
- `/product/:id` - Product detail page
- `/wishlist` - Saved wishlist products
- `/checkout` - Multi-step checkout flow
- `/auth` - Login and registration UI

## Folder Structure

```text
NexaCart/
├── public/
├── src/
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── store.js
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Getting Started

### Prerequisites

Install Node.js and npm on your system.

### Installation

```bash
git clone https://github.com/SHREYA-TIWARI12/NexaCart.git
cd NexaCart
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173/
```

## Available Scripts

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs Oxlint for code quality checks.

## Production Notes

The project currently uses API-style product loading with a local fallback dataset. For a full production deployment, this frontend can be connected to a backend service for:

- Real user authentication
- Product inventory management
- Order storage
- Payment gateway integration
- Admin dashboard and product management

## Verification

The project has been verified with:

```bash
npm run build
npm run lint
```

## Author

**Shreya Tiwari**  
GitHub: [SHREYA-TIWARI12](https://github.com/SHREYA-TIWARI12)

## License

This project is licensed under the terms included in the repository license file.
