import {AppConfigInput} from "@nuxt/schema";

export default defineAppConfig({
    theme: {
        options: {
            dark: true,
        },
        colors: {
            primary: '#215e8a',  // todo: Add support formats (hex, hex(a), rgba, hsla)
        },
        customColors: []
    }
}) as AppConfigInput
