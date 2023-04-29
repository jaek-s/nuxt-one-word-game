<script setup lan="ts">
// const auth = useFirebaseAuth();
</script>

<template>
    <section class="px-4 max-w-full w-full flex flex-col gap-6 sm:w-96">
        <header>
            <h1 class="font-semibold text-2xl">Create an Account</h1>
        </header>
        <form class="flex flex-col gap-2">
            <input
                type="text"
                placeholder="email"
                class="text-stone-900 px-4 py-2 rounded"
            />
            <input
                type="password"
                placeholder="password"
                class="text-stone-900 px-4 py-2 rounded"
            />
            <button type="submit" class="btn-primary">submit</button>
        </form>
    </section>
</template>
