import {reactive, unref} from '#imports';
import {Ref} from "vue";

export function useSectionToggle(map: Ref<Record<string, boolean>>) {
    const sections = reactive(unref(map))

    const toggle = (section: keyof typeof sections) => {
        sections[section] = !sections[section]
    }

    return {
        sections,
        toggle,
    }
}
