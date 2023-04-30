/* eslint no-console: "off" */

import { connectAuthEmulator, getAuth } from "firebase/auth";
import { type FirebaseApp } from "firebase/app";

export default defineNuxtPlugin((nuxtApp) => {
    // TODO: make it possible to turn this off
    const firebaseApp = nuxtApp.$firebaseApp as FirebaseApp;

    const auth = getAuth(firebaseApp);

    if (!auth) {
        console.log("⚠️ can't get auth in firebase emulator plugin");
    }

    try {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        console.log("✅ Auth emulator connected");
    } catch (error) {
        console.log(
            "❌ error connecting to auth emulator in firebase emulator plugin",
            error
        );
    }
});
