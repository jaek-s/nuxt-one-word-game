<script setup lang="ts">
const { data } = (await useFetch("/api/tickers/?limit=10")) as any;
</script>

<template>
    <section>
        <h1>Index Page</h1>

        <table class="divide-y divide-gray-300 w-96">
            <thead class="font-bold">
                <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Symbol</th>
                    <th class="text-left">Price</th>
                    <th class="text-left">Details</th>
                </tr>
            </thead>
            <tr v-for="currency in data.data" :key="currency.id">
                <td>{{ currency.name }}</td>
                <td>{{ currency.symbol }}</td>
                <td>{{ currency.price_usd }}</td>
                <td>
                    <NuxtLink
                        :to="'/currency/' + currency.id"
                        class="text-blue-700 hover:underline"
                        >{{ currency.id }}</NuxtLink
                    >
                </td>
            </tr>
        </table>
    </section>
</template>
