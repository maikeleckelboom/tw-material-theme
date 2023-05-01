import {HctColor, KeyColors} from "~";
import {argbFromHex, Blend, hexFromArgb, TonalPalette} from "@material/material-color-utilities";
import {useKeyColors} from "#imports";


type Bounds = {
    min: number
    max: number
}

type ColorModelBounds = {
    [key in keyof HctColor]: Bounds
}

const bounds: ColorModelBounds = {
    hue: {min: 0, max: 360},
    chroma: {min: 0, max: 150},
    tone: {min: 0, max: 100}
} as const

export function useCorePaletteColor(key: keyof KeyColors) {

    const keyColors = useKeyColors()

    const hex = computed({
        get: () => keyColors.value[key],
        set: (v: string) => keyColors.value[key] = v
    })

    const palette = computed(() => TonalPalette.fromInt(argbFromHex(hex.value)))

    const model = reactive<HctColor>({
        hue: palette.value.hue,
        chroma: palette.value.chroma,
        tone: 50
    })

    watch(() => model.tone, (tone) => {
        keyColors.value[key] = hexFromArgb(palette.value.tone(tone))
    })

    watch([() => model.hue, () => model.chroma], ([hue, chroma]) => {
        const palette = TonalPalette.fromHueAndChroma(hue, chroma)
        keyColors.value[key] = hexFromArgb(palette.tone(model.tone))
    })

    watch(hex, (h) => {
        const palette = TonalPalette.fromInt(argbFromHex(h))
        model.hue = palette.hue
        model.chroma = palette.chroma
    })

    return {
        model,
        bounds,
        hex
    }
}
