<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";
import { object, string } from "yup";

const schema = object({
    email: string().required().email(),
    password: string().required().min(10),
});

const handleSubmit = async ({ email, password }: Record<string, unknown>) => {
    const auth = useFirebaseAuth();

    if (!auth) {
        // show an error?
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email as string, password as string);
    } catch (error) {
        // show an error
        console.error(error);
    }
};
</script>

<template>
    <div class="w-full flex flex-col gap-4">
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
    </div>
</template>
