## WURSTCORD

Wurstcord is a feature-rich chatting app built with Next.js 13 and TypeScript. Users can log in or sign up to create or join servers, engage in text, audio, and video channels, and interact with other users. The app uses web sockets for real-time messaging.

Note: If app deployment fails, it is caused because my credits in railway.app are finished, and this stops deployment. You can still run app localy.

## Installation

If you want to start and reproduce the app localy, follow this steps

```bash
git clone https://github.com/jkielbaska/wurstcord.git
cd ./wurstcord
```

After cloning you have to add your own .env.local file with following variables

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YourClerkPublishableKey
CLERK_SECRET_KEY=YourClerkSecretKey
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

DATABASE_URL=You have to setup your own database using prisma with mysql

UPLOADTHING_SECRET=YourUploadThingSecret
UPLOADTHING_APP_ID=YourUploadThingAppId

LIVEKIT_API_KEY=YourLivekitApiKey
LIVEKIT_API_SECRET=YourLivekitApiSecret
NEXT_PUBLIC_LIVEKIT_URL=YourLivekitUrl
NEXT_PUBLIC_SITE_URL=YourSiteUrl
```

After this you can run app by running this commands:

```bash
npm install
npm run dev
```

## Technologies

```typescript
"next": "13.4.12",
"react": "18.2.0",
"typescript": "5.2.2",
"tailwindcss": "3.3.3",
"react-redux": "^8.0.5",
"uploadthing": "^5.5.3",
"zustand": "^4.4.1"
"zod": "^3.22.2",
"react-hook-form": "^7.46.1",
"socket.io": "^4.7.2",
"@clerk/nextjs": "^4.23.5",
```

## Usage

- Landing page and sign-in/sign-up pages accessible when not logged in.

- Redirects to user servers or a modal for creating servers or joining via an invitation link after logging in.

- Consistent and intuitive layout for each server. You have same features on every server, the amount of options (for example changing server name or image, adding people, deleting members) depends on your role (Admin, Moderator, Guest).

## TODO

- readme
- add tests!
- add translation
- add meme generator
- refactor code
- improve landing page

Feel free to reach out for any assistance or clarification.
