<script setup lang="ts">
const handleLogOut = () => {
    const auth = useFirebaseAuth();

    if (!auth) {
        navigateTo("/");
        return;
    }

    auth.signOut();
};
</script>

<template>
    <div>
        <header
            class="bg-stone-900 w-screen mx-[calc(50%-50vw)] mb-12 shadow shadow-stone-900"
        >
            <div
                class="max-w-screen-xl px-4 mx-auto py-2 flex justify-between items-center"
            >
                <NuxtLink to="/stories">
                    <h1 class="text-md font-bold text-stone-300 leading-none">
                        One<br />Word<br />Game
                    </h1>
                </NuxtLink>
                <button class="btn" @click="handleLogOut">Log Out</button>
            </div>
        </header>
        <div class="max-w-screen-xl px-4 mx-auto">
            <slot />
        </div>
    </div>
</template>
