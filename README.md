# Ask-Bot

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

````bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev


```md
# Ask-Bot

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
````

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying [`src/app/page.tsx`](src/app/page.tsx). The page auto-updates as you edit the file.

## Project Structure

- `src/app/layout.tsx`: Defines the root layout of the application.
- `src/app/page.tsx`: Main page component that handles the chat interface.
- `src/app/api/chat/route.tsx`: API route for handling chat messages.
- `src/app/globals.css`: Global CSS styles including Tailwind CSS utilities.
- `tailwind.config.ts`: Tailwind CSS configuration file.
- `next.config.ts`: Next.js configuration file.
- `postcss.config.mjs`: PostCSS configuration file.
- `tsconfig.json`: TypeScript configuration file.

## Features

- **Chat Interface**: A simple chat interface where users can send messages and receive responses from a bot.
- **API Integration**: Uses `groq-sdk` to interact with an external API for chat completions.
- **Tailwind CSS**: Utilizes Tailwind CSS for styling.
- **Custom Fonts**: Uses `next/font` to load custom fonts.

## Environment Variables

Configure environment variables:

```bash
GROQCLOUD_API_KEY=your-api-key-here
```

Make sure to restart the server after creating or updating the `.env` file to ensure the changes take effect.

## Deployment

To deploy your Ask-Bot, you can use platforms like Vercel for quick and seamless deployment. Follow the Next.js deployment documentation for detailed instructions.
