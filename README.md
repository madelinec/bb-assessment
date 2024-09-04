This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, make sure the provided .env file is at the root of the directory

run the dependency install:

```bash
npm install
```

run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result!


## Notes + Additional Considerations:
The database is deployed on Supabase, but the schema can be found inside src/db/prisma/schema.prisma

The newsletter data is dynamically loaded from the db, so it's possible that order is not consistent with design.

The current user is hard coded in the queries - this is something that should be determined with a login/auth flow. (queries inside src/app/api)

Page and tile component in src/app/newsletters/page.tsx and src/app/newsletters/_lib/NewsTiles.tsx

Can search directory for "NOTE:" for additional inline notes
