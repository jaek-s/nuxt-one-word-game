<script setup lang="ts">
import { object, string } from "yup";
import {
    useSingleStory,
    useStoryWords,
    useCreateStoryWord,
} from "@/composables/stories";

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
const createStoryWord = useCreateStoryWord();

const newWordSchema = object({
    word: string()
        .required("A word is required")
        .matches(/^[^\s]*$/, "You can only enter one word at a time"),
});
const handleNewWordFormSubmit = (
    { word }: Record<string, unknown>,
    { resetForm }: Record<string, any>,
) => {
    createStoryWord(storyId, word as string);
    resetForm();
};
</script>

<template>
    <section class="flex flex-col gap-4">
        <h1 class="text-7xl font-bold" v-text="story?.data.name" />

        <p v-if="words.length">
            <template v-for="word in words" :key="word.id">
                <span v-text="word.data.content" />{{ " " }}
            </template>
        </p>
        <h2 v-else class="text-2xl text-stone-400">
            Your story begins! Invite a friend and add the first word to get started.
        </h2>

        <VeeForm
            :validation-schema="newWordSchema"
            class="flex items-start gap-2"
            @submit="handleNewWordFormSubmit"
        >
            <InputText name="word" label="Add a Word" />
            <button class="btn-primary" type="submit">add</button>
        </VeeForm>
    </section>
</template>
