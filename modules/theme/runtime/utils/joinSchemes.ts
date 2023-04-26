import {Ref} from "vue";
import {SchemeJSON} from "~";
import {hexFromArgb} from "@material/material-color-utilities";
import {useKeyColors} from "#imports";

export const joinSchemes = (light: Ref<SchemeJSON>, dark: Ref<SchemeJSON>) => {
    const keyColors = useKeyColors() as Ref<Record<string, string>>
    return Object.entries(light.value).reduce((acc, [key, value]) => {
        acc[key] = {
            name: nameFromKey(key),
            color: hexFromArgb(value as number).toUpperCase(),
            darkColor: hexFromArgb(dark.value[key]).toUpperCase(),
            isKey: Object.keys(keyColors.value).includes(key)
        }
        return acc
    }, {} as Record<string, { name: string, color: string, darkColor: string, isKey: boolean }>)
}
