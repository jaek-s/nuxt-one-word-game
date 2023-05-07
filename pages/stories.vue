<script setup lang="ts">
import { object, string } from "yup";
import { useStoryStore } from "@/stores/stories";

definePageMeta({
    middleware: ["check-authentication"],
});

const storyStore = useStoryStore();

const createStorySchema = object({
    name: string().required("You must give your new story a name."),
});

const createStory = (
    { name }: Record<string, unknown>,
    { resetForm }: Record<string, any>
) => {
    storyStore.addStory(name as string);
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
        <pre v-text="storyStore.stories" />
    </div>
</template>
