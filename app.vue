<script setup lang="ts">
const route = useRoute();
const user = useCurrentUser();

// This watcher should be client side only
onMounted(() => {
    watch(user, (user, prevUser) => {
        if (prevUser && !user) {
            // user logged out
            navigateTo("/");
        } else if (user && typeof route.query.redirect === "string") {
            // user logged in
            navigateTo(route.query.redirect);
        }
    });
});
</script>

<template>
    <NuxtLayout>
        <NuxtPage />
    </NuxtLayout>
</template>
