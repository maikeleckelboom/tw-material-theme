import {hexFromArgb, TonalPalette} from "@material/material-color-utilities";

export const utilizeTonalPalette = (palette: TonalPalette, {tones}: { tones: number[] }) => {
    const result: Record<string, string> = {};
    for (const tone of tones) {
        const tonalPalette = TonalPalette.fromHueAndChroma(palette.hue, palette.chroma);
        const color = tonalPalette.tone(tone);
        result[tone] = hexFromArgb(color);
    }
    return result;
}
