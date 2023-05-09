<script setup lang="ts">
import { object, string } from "yup";
import { addDoc, collection, doc, deleteDoc, query, where } from "firebase/firestore";
import type { Story } from "@/types";

definePageMeta({
    middleware: ["check-authentication"],
});

const user = useCurrentUser();
const storiesCollection = collection(useFirestore(), "stories");
const stories = useCollection<Story>(
    query(storiesCollection, where("owner", "==", user.value?.uid))
);

const createStorySchema = object({
    name: string().required("You must give your new story a name."),
});
const createStory = (
    { name }: Record<string, unknown>,
    { resetForm }: Record<string, any>
) => {
    addDoc(storiesCollection, {
        owner: user.value?.uid,
        name,
    });
    resetForm();
};

const deleteStory = (storyId: string) => {
    deleteDoc(doc(storiesCollection, storyId));
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
                v-for="story in stories"
                :key="story.id"
                class="grid grid-cols-3 w-full px-6 py-4"
            >
                <NuxtLink :to="`/stories/${story.id}`" v-text="story.name" />
                <span v-text="story.owner" />
                <span>
                    <button @click="deleteStory(story.id)">delete</button>
                </span>
            </div>
        </section>
    </div>
</template>
