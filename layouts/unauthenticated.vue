<template>
    <div
        class="max-w-screen-sm mx-auto mt-16 px-8 flex flex-col justify-between gap-8 items-center sm:items-stretch sm:flex-row"
    >
        <header class="w-64">
            <NuxtLink to="/">
                <h1 class="text-7xl font-black leading-none">
                    One<br />Word<br />Game
                </h1>
                <h2 class="text-lg font-medium text-stone-400">
                    Write a story with friends,<br />one word at a time.
                </h2>
            </NuxtLink>
        </header>
        <main class="grow">
            <slot />
        </main>
    </div>
</template>
