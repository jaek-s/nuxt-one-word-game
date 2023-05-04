<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { object, string } from "yup";

definePageMeta({
    layout: "unauthenticated",
});

const schema = object({
    email: string()
        .required("You must enter your email.")
        .email("This email address is invalid."),
    password: string().required("You must enter your password."),
});

const handleSubmit = async ({ email, password }: Record<string, unknown>) => {
    const auth = useFirebaseAuth();

    if (!auth) {
        // show an error?
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email as string, password as string);
        navigateTo("/stories");
    } catch (error) {
        // show an error
        console.error(error);
    }
};
</script>

<template>
    <div class="w-full flex flex-col gap-4">
        <header>
            <h1 class="font-semibold text-2xl">Log In</h1>
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
