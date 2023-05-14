<script setup lang="ts">
import { useSingleStory, useStoryWords } from "@/composables/stories";

definePageMeta({
    middleware: ["check-authentication"],
});

const route = useRoute();

const storyId = computed(() => route.params.storyId as string);
const story = useSingleStory(storyId);

// // TODO: figure out a way to throw a 404 if story definitely doesn't exist.
// if (!story.value) { // This doesn't work
//     throw createError({
//         statusCode: 404,
//         statusMessage: "Story Not Found",
//         fatal: true,
//     });
// }

const words = useStoryWords(storyId);
</script>

<template>
    <section>
        <h1 class="text-7xl font-bold" v-text="story?.name" />
        <pre v-text="story" />
        <pre v-text="words" />
    </section>
</template>
