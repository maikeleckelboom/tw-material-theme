import {Theme} from "@material/material-color-utilities";
import {Ref} from "vue";

export const useTheme = () => {
    const {$theme} = useNuxtApp()
    return $theme as Ref<Theme>
}
