# E-Commerce (not yet complete)

## The backend for an e-commerce website built with Express.js, TypeORM, MySQL, and TypeScript.

### Requirements

- Node.js
- TypeScript
- MySQL

### Installation

1. Clone the repository:

```
git clone https://github.com/zcrossoverz/eCommerceWebsite.git

cd eCommerceWebsite
cd server
```

2. Install the dependencies:

```
npm install
```

3. Rename file `.env.example` into `.env` and setup config

4. Start the development server:

```
npm run dev
```

The backend will be running on `http://localhost:3000`. PORT can be change in .env file.

### Tools and Libraries

- [Express.js](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js
- [TypeORM](https://typeorm.io/): ORM for TypeScript and JavaScript that can run in Node.js, browser, and React Native.
- [CORS](https://github.com/expressjs/cors): Express middleware for handling Cross-Origin Resource Sharing (CORS)
- [TypeScript](https://www.typescriptlang.org/): Superset of JavaScript that adds optional static typing and other features to the language.

## The fronted for an e-commerce website built with React.js, vite, redux and TypeScript.

### Installation

1. Clone the repository:

```
git clone https://github.com/zcrossoverz/eCommerceWebsite.git

cd eCommerceWebsite
cd client
```

2. Install the dependencies:

```
npm install
```

4. Start the development server:

```
npm run dev
```

The frontend will be running on `http://localhost:3001`. PORT can be change in vite.config.ts

```
 server: {
    port: 3001,
  }
```

### Cài extension và setup VS Code

Các Extension nên cài

- ESLint

- Prettier - Code formatter

- Tailwindcss

- EditorConfig for VS Code

Cấu hình VS Code

- Bật Format On Save
- Chọn Default Formatter là Prettier
