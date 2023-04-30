// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        "@nuxtjs/eslint-module",
        "@nuxtjs/tailwindcss",
        "nuxt-vuefire",
        "@vee-validate/nuxt",
    ],
    vuefire: {
        config: {
            apiKey: "AIzaSyCFR8hkuNn09BV3hq6CUUHA7DTKJw8iS58",
            authDomain: "js-one-word-game.firebaseapp.com",
            projectId: "js-one-word-game",
            storageBucket: "js-one-word-game.appspot.com",
            messagingSenderId: "262705775305",
            appId: "1:262705775305:web:ad67a41f7c4539eac4c318",
        },
    },
    veeValidate: {
        // disable or enable auto imports
        autoImports: true,
        // Use different names for components
        componentNames: {
            Form: "VeeForm",
            Field: "VeeField",
            FieldArray: "VeeFieldArray",
            ErrorMessage: "VeeErrorMessage",
        },
    },
});
