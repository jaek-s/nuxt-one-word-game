<script setup lang="ts">
definePageMeta({
    layout: false,
});

const user = useCurrentUser();

watchEffect(() => {
    if (user.value) {
        setPageLayout("default");
    } else {
        setPageLayout("unauthenticated");
    }
});
</script>

<template>
    <div v-if="!user" class="flex flex-col gap-4 w-full justify-center items-center">
        <NuxtLink
            to="/create-account"
            class="btn-primary w-64 h-16 text-lg font-medium"
        >
            Create an Account
        </NuxtLink>
        <NuxtLink to="/login" class="btn w-64">Log In</NuxtLink>
    </div>
    <div v-else class="flex items-center justify-center h-64 text-2xl">Welcome in!</div>
</template>
