import {HctColor, KeyColors} from "~";
import {argbFromHex, hexFromArgb, TonalPalette} from "@material/material-color-utilities";
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

    const palette = TonalPalette.fromInt(argbFromHex(hex.value));

    const model = reactive<HctColor>({
        hue: palette.hue,
        chroma: palette.chroma,
        tone: 60
    })

    const {hue, chroma, tone} = toRefs(model)

    watch(() => model.tone, (tone) => {
        console.log('tone', tone)
        // const palette = TonalPalette.fromHueAndChroma(model.hue, model.chroma)
        // keyColors.value[key] = hexFromArgb(palette.tone(tone))
    })

    watch([() => model.hue, () => model.chroma], ([hue, chroma]) => {
        console.log('hue', hue, 'chroma', chroma)
        const palette = TonalPalette.fromHueAndChroma(hue, chroma)
        keyColors.value[key] = hexFromArgb(palette.tone(model.tone))
    })

    return {
        model,
        hue,
        chroma,
        tone,
        bounds,
        hex
    }
}
