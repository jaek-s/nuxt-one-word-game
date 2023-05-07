<script setup lang="ts">
import { nanoid } from "nanoid";

export interface Props {
    name: string;
    type?: string;
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
    label: "",
});

const displayedLabel = computed(() => props.label || props.name);
const id = nanoid();
</script>

<template>
    <div>
        <div
            class="relative flex border-2 border-stone-400 rounded focus-within:border-stone-200"
        >
            <VeeField
                :id="id"
                class="peer bg-stone-800 px-4 py-2 w-full focus-visible:outline-none placeholder:text-transparent"
                :name="name"
                :type="type"
                :label="displayedLabel"
                :placeholder="displayedLabel"
            />
            <slot />
            <label
                class="transition-all absolute text-stone-500 cursor-text bg-stone-800 px-1 text-base top-2 left-3 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:-top-2.5 peer-[&:not(:placeholder-shown)]:left-2 peer-[&:not(:placeholder-shown)]:text-stone-200 peer-focus-visible:text-xs peer-focus-visible:-top-2.5 peer-focus-visible:left-2 peer-focus-visible:text-stone-200"
                :for="id"
                v-text="displayedLabel"
            />
        </div>
        <div class="h-3 pt-1 flex items-center">
            <VeeErrorMessage as="div" class="text-xs text-rose-300" :name="name" />
        </div>
    </div>
</template>
