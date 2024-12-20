# Daily 'scopes

Daily 'scopes serves you fresh 'scopes every day.

## Tech

This is an NextJS (App dir) app using RSC. Data is stored in a Supabase Postgres database.
A cron job fetches new scopes, translates them using OpenAI API and stores the results in the database.

The app is deployed to Vercel.

## Envs

| Environment Variable            | Description                                                                          |
| ------------------------------- | ------------------------------------------------------------------------------------ |
| `OPENAI_API_KEY`                | API key for OpenAI services. Required for making requests to OpenAI's API endpoints. |
| `BASE_URL`                      | The base URL of the scope source                                                     |
| `SCOPES_ROUTE`                  | Route of the scopes page at source                                                   |
| `CRON_SECRET`                   | Secret key used for securing cron job endpoints or verifying cron job requests.      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Service key to bypass RLS policy                                                     |
| `NEXT_PUBLIC_SUPABASE_URL`      | Public URL of your Supabase project.                                                 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anonymous key for Supabase.                                                   |

## Local development

1. Install the deps: `pnpm i`
1. Start the development server: `pnpm dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
