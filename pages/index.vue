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
    <div class="h-full flex flex-col gap-6 w-full justify-center">
        <NuxtLink to="/create-account" class="btn-primary h-16 text-lg font-medium">
            Create an Account
        </NuxtLink>
        <NuxtLink to="/login" class="btn">Log In</NuxtLink>
    </div>
</template>
