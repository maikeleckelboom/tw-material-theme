// @ts-nocheck
export default defineNuxtConfig({
  // app: {
  //   layoutTransition: {
  //     name: 'layout-transition',
  //     mode: 'out-in'
  //   },
  //   pageTransition: {
  //     name: 'page-transition',
  //     mode: 'out-in'
  //   }
  // },
  components: [
    {
      path: "~/components",
      pathPrefix: false
    }
  ],
  colorMode: {
    classSuffix: ""
  },
  css: [
    "~/assets/css/app.css"
  ],
  imports: {
    dirs: ["stores", "utils", "composables"]
  },
  modules: [
    "~/modules/theme/index.ts",
    "~/modules/dialog/index.ts",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vueuse/nuxt",
    "nuxt-icon",
    "@pinia/nuxt",
    "nuxt-viewport",
    "nuxt-xstate"
  ],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    viewer: false
  },
  pinia: {
    autoImports: ["defineStore", "storeToRefs"]
  },
  viewport: {
    breakpoints: {
      compact: 0,
      medium: 600,
      expanded: 840,
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536
    }
  },
  appConfig: {
    theme: {
      options: {
        dark: true
      },
      colors: {
        primary: "#2f2867"
      },
      customColors: [
        {
          name: "Purple Cream",
          value: "#a6a6d8"
        },
        {
          name: "Green Turtle",
          value: "#a6be89"
        },
        {
          name: "Blue Sky",
          value: "#a6d8d8"
        }
      ]
    }
  }
});
