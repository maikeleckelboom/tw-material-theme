import { addPlugin, createResolver, defineNuxtModule } from "nuxt/kit";

const { resolve } = createResolver(import.meta.url);

export default defineNuxtModule({
  meta: {
    name: "carousel",
    configKey: "carousel",
    version: "0.0.1",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },
  defaults: {},
  hooks: {
    "components:dirs"(dirs) {
      dirs.push({
        path: resolve("./runtime/components"),
        pathPrefix: false,
      });
    },
  },
  setup: function (options, nuxt) {
    addPlugin(resolve("./runtime/plugin"));
  },
});
