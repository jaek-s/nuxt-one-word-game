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
    <div class="flex flex-col gap-4 w-full justify-center items-center">
        <NuxtLink to="create-account" class="btn-primary w-64 h-16 text-lg font-medium">
            Create an Account
        </NuxtLink>
        <button class="btn w-64">Log In</button>
    </div>
</template>
