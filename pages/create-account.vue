<script setup lang="ts">
import { createUserWithEmailAndPassword } from "firebase/auth";
import { object, string, ref as yupRef } from "yup";

definePageMeta({
    layout: "unauthenticated",
});

const schema = object({
    email: string()
        .required("An email address is required")
        .email("This email address is invalid."),
    password: string()
        .required("A password is required.")
        .min(8, "Your password must be at least 8 characters."),
    passwordConfirmation: string()
        .required("You must confirm your password.")
        .oneOf([yupRef("password")], "The passwords do not match"),
});

const handleSubmit = async ({ email, password }: Record<string, unknown>) => {
    const auth = useFirebaseAuth();

    if (!auth) {
        // show an error?
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email as string, password as string);
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
            <h1 class="font-semibold text-2xl">Create an Account</h1>
        </header>
        <VeeForm
            class="flex flex-col gap-2"
            :validation-schema="schema"
            @submit="handleSubmit"
        >
            <InputText name="email" type="email" />
            <InputText name="password" type="password" />
            <InputText
                label="confirm password"
                name="passwordConfirmation"
                type="password"
            />
            <button type="submit" class="btn-primary">submit</button>
        </VeeForm>
    </div>
</template>
