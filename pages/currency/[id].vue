<script setup lang="ts">
const route = useRoute();
const { data } = (await useFetch("/api/ticker?id=" + route.params.id)) as any;
const coin = data.value[0];
</script>

<template>
    <section>
        <h2>{{ coin.name }} Detail page</h2>
        <table class="divide-y divide-gray-300 w-96">
            <thead class="font-bold text-left">
                <th>Symbol</th>
                <th>Rank</th>
                <th>Price - US $</th>
                <th>Market Cap - US $</th>
            </thead>
            <tr>
                <td>{{ coin.symbol }}</td>
                <td>{{ coin.rank }}</td>
                <td>{{ coin.price_usd }}</td>
                <td>{{ coin.market_cap_usd }}</td>
            </tr>
        </table>
    </section>
</template>
