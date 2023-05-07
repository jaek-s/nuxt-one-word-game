// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: [
        "@nuxtjs/eslint-module",
        "@nuxtjs/tailwindcss",
        "@pinia/nuxt",
        "@vee-validate/nuxt",
        "nuxt-vuefire",
    ],
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
    vuefire: {
        config: {
            apiKey: "AIzaSyCFR8hkuNn09BV3hq6CUUHA7DTKJw8iS58",
            authDomain: "js-one-word-game.firebaseapp.com",
            projectId: "js-one-word-game",
            storageBucket: "js-one-word-game.appspot.com",
            messagingSenderId: "262705775305",
            appId: "1:262705775305:web:d28cbd593d3e74e5c4c318",
        },
        auth: true,
        /* appCheck: {
            debug: process.env.NODE_ENV !== "production",
            isTokenAutoRefreshEnabled: true,
            provider: "ReCaptchaV3",
            key: "6LdNA8wlAAAAAMKlKLtUl6jnd6CvxZJa_J2YU8w8",
        }, */
    },
});
