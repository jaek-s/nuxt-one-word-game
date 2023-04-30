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
    <div class="relative">
        <VeeField
            :id="id"
            class="peer border-2 border-stone-400 bg-stone-800 px-4 py-2 rounded mb-4 w-full focus-visible:outline-none focus-visible:border-stone-200 placeholder:text-transparent"
            :name="name"
            :type="type"
            :label="displayedLabel"
            :placeholder="displayedLabel"
        />
        <label
            class="transition-all absolute text-stone-400 cursor-text bg-stone-800 px-1 text-base top-2.5 left-[0.825rem] peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:-top-2 peer-[&:not(:placeholder-shown)]:left-2 peer-focus-visible:text-xs peer-focus-visible:-top-2 peer-focus-visible:left-2 peer-focus-visible:text-stone-200"
            :for="id"
            v-text="displayedLabel"
        />
        <VeeErrorMessage
            as="div"
            class="text-xs text-rose-300 absolute -translate-y-3.5"
            :name="name"
        />
    </div>
</template>
