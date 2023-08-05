# One word game.

An attempt at a collaborative story telling game built with nuxt and firebase.

This is very much a work and progress and doesn't do much yet. Logging in, creating an account, creating basic "story" objects, and "word" objects within a story currently work. Sharing stories, taking turns adding words, error handling, and turning off the firebase emulator for production still need work.

Based on the Nuxt 3 Minimal Starter. Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
npm i
```

## Development Server

Make sure the [firebase local emulator](https://firebase.google.com/docs/emulator-suite) is installed. [Temurin](https://adoptium.net/) is the recommended JDK to use for this.

Start the local emulator

```bash
npm run firebase
```

Start the development server on `http://localhost:3000`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
