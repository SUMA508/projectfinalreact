# Olio Cucina

Restaurant website built with React and Vite.

## Development

```sh
npm install
npm run dev
```

## Contact email setup

The contact form sends submissions to `yllibrahimi30@gmail.com` through the Resend API using the server-side Vercel function in `api/contact.js`. The Resend API key is only read by the server and must never be added to client-side code.

1. Create a Resend account, verify a sending domain, and create an API key.
2. Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. The sender address must use your verified Resend domain. `CONTACT_TO_EMAIL` is prefilled with the contact inbox and can be changed if needed.
3. In Vercel, add the same environment variables in the project’s Settings → Environment Variables, then redeploy.
4. To test locally, copy `.env.example` to `.env.local`, fill in the Resend values, and run `npm run dev`. Vite serves the same contact endpoint locally; restart the dev server after changing environment variables.

The form reports success only after Resend accepts the message. A delivered email still depends on the Resend account and sender domain being configured correctly.

## Build and lint

```sh
npm run build
npm run lint
```
