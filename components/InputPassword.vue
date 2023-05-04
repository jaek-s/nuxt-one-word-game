<script setup lang="ts">
export interface Props {
    name: string;
    label?: string;
}

const props = withDefaults(defineProps<Props>(), {
    label: "password",
});

const showPassword = ref(false);
</script>

<template>
    <InputText v-bind="props" :type="showPassword ? 'text' : 'password'">
        <button
            class="text-sm text-stone-500 hover:text-stone-400 pr-4"
            type="button"
            @click="showPassword = !showPassword"
            v-text="showPassword ? 'hide' : 'show'"
        />
    </InputText>
</template>
