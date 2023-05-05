<script setup lang="ts">
import { nanoid } from "nanoid";
import { collection, addDoc } from "firebase/firestore";

definePageMeta({
    middleware: ["check-authentication"],
});
const db = useFirestore();
const firestoreStories = collection(db, "stories");
const stories = useCollection(firestoreStories);

const addItem = () => {
    addDoc(firestoreStories, {
        hello: nanoid(),
    });
};
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center">
        <h1 class="text-2xl">Welcome In!</h1>
        <button class="btn-primary" @click="addItem">Add something to the DB</button>
        <pre v-text="stories" />
    </div>
</template>
