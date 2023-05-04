<script setup lang="ts">
definePageMeta({
    middleware: ["check-authentication"],
});
</script>

<template>
    <div class="flex items-center justify-center h-64">
        <h1 class="text-2xl">Welcome In!</h1>
    </div>
</template>
