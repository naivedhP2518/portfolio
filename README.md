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

## Deploy a Vercel preview

1. Set `apiUrl` in `Frontend/src/environments/environment.prod.ts` to the deployed backend API URL (including `/api`).
2. Push `refactor/fullstack-portfolio` and create a Vercel preview deployment from that branch.
3. Set the Vercel project root to `Frontend`, build command to `npm run vercel-build`, and output directory to `dist/portfolio-app/browser`.
4. Configure the backend environment and CORS to allow the preview domain. Review the preview before promoting any deployment.
