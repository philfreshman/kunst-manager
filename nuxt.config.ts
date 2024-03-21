export default defineNuxtConfig({
  modules: ["@nuxt/ui", "@nuxtjs/tailwindcss", "nuxt-mdi", "@nuxtjs/supabase", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "./locales/i18n.config.ts",
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
        file: "en.json"
      },
      {
        code: "de",
        iso: "de-DE",
        name: "Deutsch",
        file: "de.json"
      }
    ],
    defaultLocale: "de",
    langDir: "./locales/",
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected"
    }
  },
  devtools: {
    enabled: false
  },
  ui: {
    icons: ["heroicons", "mdi"]
  },
  css: ["~/assets/fonts/fonts.sass"],
  runtimeConfig: {
    useAuth: false
  },
  imports: {
    autoImport: true
  },
  components: {
    global: true,
    dirs: ["~/components", "~/layouts/components"]
  },
  colorMode: {
    preference: "dark"
  }
})
