<script setup lang="ts">
import { object, string } from "yup";
// const auth = useFirebaseAuth();

const schema = object({
    email: string().required().email(),
    password: string().required().min(10),
});

const handleSubmit = (data: any) => {
    console.debug("submit", data);
};
</script>

<template>
    <section class="px-4 max-w-full w-full flex flex-col gap-4 sm:w-96">
        <header>
            <h1 class="font-semibold text-2xl">Create an Account</h1>
        </header>
        <VeeForm
            class="flex flex-col gap-2"
            :validation-schema="schema"
            @submit="handleSubmit"
        >
            <InputText name="email" type="email" />
            <InputText name="password" type="password" />
            <button type="submit" class="btn-primary">submit</button>
        </VeeForm>
    </section>
</template>
