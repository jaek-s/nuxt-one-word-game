<script setup lang="ts">
import { object, string } from "yup";
import { useStoryStore } from "@/stores/stories";

definePageMeta({
    middleware: ["check-authentication"],
});

const stories = useStoryStore();

const createStorySchema = object({
    name: string().required("You must give your new story a name."),
});

const createStory = (
    { name }: Record<string, unknown>,
    { resetForm }: Record<string, any>
) => {
    stories.add(name as string);
    resetForm();
};
</script>

<template>
    <div class="flex flex-col gap-6 items-center justify-center">
        <h1 class="text-2xl">Welcome In!</h1>
        <VeeForm
            :validation-schema="createStorySchema"
            class="flex items-start gap-2"
            @submit="createStory"
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
                v-for="story in stories.collection"
                :key="story.id"
                class="grid grid-cols-3 w-full px-6 py-4"
            >
                <span v-text="story.name" />
                <span v-text="story.owner" />
                <span>
                    <button @click="stories.delete(story.id)">delete</button>
                </span>
            </div>
        </section>
    </div>
</template>
