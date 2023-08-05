<script setup lang="ts">
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { object, string } from "yup";

definePageMeta({
    layout: "unauthenticated",
});

const showGenericError = ref(false);

const schema = object({
    email: string()
        .required("You must enter your email.")
        .email("This email address is invalid."),
    password: string().required("You must enter your password."),
});

const handleSubmit = async (
    { email, password }: Record<string, unknown>,
    { setFieldError }: Record<string, any>,
) => {
    showGenericError.value = false;

    const auth = useFirebaseAuth();

    if (!auth) {
        showGenericError.value = true;
        return;
    }

    try {
        await signInWithEmailAndPassword(auth, email as string, password as string);
        navigateTo("/stories");
    } catch (error) {
        if (!(error instanceof FirebaseError)) {
            showGenericError.value = true;
            return;
        }

        if (error.code === "auth/user-not-found") {
            return setFieldError("email", "A user with this email does not exist.");
        }

        if (error.code === "auth/wrong-password") {
            return setFieldError("password", "This password is incorrect.");
        }

        showGenericError.value = true;
    }
};
</script>

<template>
    <VeeForm
        class="w-full flex flex-col gap-2"
        :validation-schema="schema"
        @submit="handleSubmit"
    >
        <header>
            <h1 class="font-semibold text-2xl">Log In</h1>
        </header>
        <InputText name="email" type="email" />
        <InputPassword name="password" />
        <button type="submit" class="btn-primary">submit</button>
        <span v-show="showGenericError" class="text-rose-300 text-sm">
            An unknown error occurred. Please refresh and try again.
        </span>
    </VeeForm>
</template>
