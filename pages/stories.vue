<script setup lang="ts">
import { collection } from "firebase/firestore";
definePageMeta({
    middleware: ["check-authentication"],
});
const db = useFirestore();
const stories = useCollection(collection(db, "stories"));
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center h-64">
        <h1 class="text-2xl">Welcome In!</h1>
        <pre v-text="stories" />
    </div>
</template>
