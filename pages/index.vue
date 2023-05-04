<script setup lang="ts">
definePageMeta({
    layout: "unauthenticated",
});

const user = useCurrentUser();
watchEffect(() => {
    if (user.value) {
        navigateTo("/stories");
    }
});
</script>

<template>
    <div class="flex flex-col gap-4 w-full justify-center items-center">
        <NuxtLink
            to="/create-account"
            class="btn-primary w-64 h-16 text-lg font-medium"
        >
            Create an Account
        </NuxtLink>
        <NuxtLink to="/login" class="btn w-64">Log In</NuxtLink>
    </div>
</template>
