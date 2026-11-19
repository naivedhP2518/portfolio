# Naivedh Patel | Full Stack Developer

Portfolio for Naivedh Patel, focused on full stack web development with Angular, TypeScript, Node.js, Express, and MongoDB.

## Project structure

- `Frontend/`: Angular application and public portfolio assets.
- `Backend/`: Express and TypeScript API with MongoDB models and seed data.

## Run locally

### Backend

```bash
cd Backend
npm install
cp .env.example .env
npm run dev
```

Configure MongoDB and the required environment variables in `Backend/.env` before starting the API. To load the sample project records into a local database, run `npm run seed`.

### Frontend

```bash
cd Frontend
npm install
npm start
```

The Angular development server runs at `http://localhost:4200`.

## Build

```bash
cd Frontend
npm run build
```
