<template>
    <main
        class="max-w-screen-lg mx-auto mt-16 flex flex-col justify-center items-center gap-8 sm:flex-row"
    >
        <header class="w-64">
            <h1 class="text-7xl font-black">One Word Game</h1>
            <h2 class="text-lg font-medium text-stone-400">
                Write a story with friends, one word at a time.
            </h2>
        </header>
        <slot />
    </main>
</template>
