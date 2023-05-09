<script setup lang="ts">
import { doc } from "firebase/firestore";

const route = useRoute();

const storyDoc = computed(() =>
    doc(useFirestore(), "stories", route.params.storyId as string)
);
//TODO: if storyDoc doesn't exist, redirect to 404

const story = useDocument(storyDoc);
</script>

<template>
    <div>
        <h1>story {{ story?.id }}</h1>
        <h2 v-text="story?.name" />
    </div>
</template>
