<script setup lang="ts">
import { object, string } from "yup";
import {
    useCreateStory,
    useDeleteStory,
    useOwnedStoryList,
} from "@/composables/stories";

definePageMeta({
    middleware: ["check-authentication"],
});

const deleteStory = useDeleteStory();
const createStory = useCreateStory();
const stories = useOwnedStoryList();

const createStorySchema = object({
    name: string().required("You must give your new story a name."),
});
const handleNewStoryFormSubmit = (
    { name }: Record<string, unknown>,
    { resetForm }: Record<string, any>
) => {
    createStory(name as string);
    resetForm();
};
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center">
        <h1 class="text-2xl">Welcome In!</h1>
        <VeeForm
            :validation-schema="createStorySchema"
            class="flex items-start gap-2"
            @submit="handleNewStoryFormSubmit"
        >
            <InputText name="name" label="Story Name" />
            <button class="btn-primary" type="submit">create</button>
        </VeeForm>
        <section class="w-full divide-y-2 divide-stone-700">
            <div class="grid grid-cols-3 font-bold text-lg w-full px-6 py-4">
                <span>name</span>
                <span>owner</span>
                <span>actions</span>
            </div>
            <div
                v-for="story in stories"
                :key="story.id"
                class="grid grid-cols-3 w-full px-6 py-4"
            >
                <NuxtLink :to="`/stories/${story.id}`">{{ story.data.name }}</NuxtLink>
                <span v-text="story.data.owner" />
                <span>
                    <button @click="deleteStory(story.id)">delete</button>
                </span>
            </div>
        </section>
    </div>
</template>
