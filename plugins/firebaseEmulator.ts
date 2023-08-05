/* eslint no-console: "off" */

import { connectAuthEmulator } from "firebase/auth";
import { connectFirestoreEmulator } from "firebase/firestore";

export default defineNuxtPlugin(() => {
    // TODO: make it possible to turn this off

    connectFirestoreEmulator(useFirestore(), "localhost", 7070);

    const auth = useFirebaseAuth();
    if (!auth) {
        console.log("⚠️ can't get auth in firebase emulator plugin");
        return;
    }

    try {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
        console.log("✅ Auth emulator connected");
    } catch (error) {
        console.log(
            "❌ error connecting to auth emulator in firebase emulator plugin",
            error,
        );
    }
});
