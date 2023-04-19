import {Ref} from "vue";
import {SchemeJSON} from "~";
import {hexFromArgb} from "@material/material-color-utilities";

export const joinSchemes = (light: Ref<SchemeJSON>, dark: Ref<SchemeJSON>) => {
    return Object.entries(light.value).reduce((acc, [key, value]) => {
        acc[key] = {
            name: nameFromKey(key),
            color: hexFromArgb(value).toUpperCase(),
            darkColor: hexFromArgb(dark.value[key]).toUpperCase()
        }
        return acc
    }, {} as Record<string, { name: string, color: string, darkColor: string }>)
}
