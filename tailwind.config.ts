import tailwindScrollbar from 'tailwind-scrollbar'
import tailwindContainerQueries from '@tailwindcss/container-queries'
import plugin from "tailwindcss/plugin"
import {Config} from "tailwindcss"

const range = (from: number, to: number) => {
    const result: number[] = []
    for (let i = from; i <= to; i++) {
        result.push(i)
    }
    return result
}

const createRange = (from: number = 0, to: number = 20) => range(from, to).reduce((acc, value) => ({
    ...acc,
    [value]: `${value}`
}), {});

const tailwindChildSelector = () => plugin(({matchVariant}) => {
    const values = createRange()
    matchVariant('nth', (v: string) => `& :nth-child(${v})`, {values})
    matchVariant('nth-last', (v: string) => `& :nth-last-child(${v})`, {values})
})

const tailwindCustomVariants = () => plugin(({addVariant}) => {
    addVariant('button', '& button')
    addVariant('router-link-active', '&.router-link-active')
    addVariant('router-link-exact-active', '&.router-link-exact-active')
    addVariant('icon', '& .icon')
    addVariant('label-text', '& .label-text')
    addVariant('current', '&.current')
    addVariant('nth-current', '& > .current')
    addVariant('all', '& *')
})

export default {
    plugins: [
        tailwindScrollbar({nocompatible: true}),
        tailwindChildSelector(),
        tailwindCustomVariants(),
        tailwindContainerQueries
    ],
    corePlugins: {
        preflight: true,
    },
    content: [
        './components/**/*.vue',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './modules/**/*.{vue,js,ts}',
        './plugins/**/*.{js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        colors: {
            // Helpers
            'transparent': "transparent",
            'current': "currentColor",
            'inherit': "inherit",
            // Palettes
            'palette': {
                'primary': {
                    0: `var(--md-ref-palette-primary0)`,
                    5: "var(--md-ref-palette-primary5)",
                    10: "var(--md-ref-palette-primary10)",
                    15: "var(--md-ref-palette-primary15)",
                    20: "var(--md-ref-palette-primary20)",
                    25: "var(--md-ref-palette-primary25)",
                    30: "var(--md-ref-palette-primary30)",
                    40: "var(--md-ref-palette-primary40)",
                    50: "var(--md-ref-palette-primary50)",
                    60: "var(--md-ref-palette-primary60)",
                    70: "var(--md-ref-palette-primary70)",
                    80: "var(--md-ref-palette-primary80)",
                    90: "var(--md-ref-palette-primary90)",
                    95: "var(--md-ref-palette-primary95)",
                    99: "var(--md-ref-palette-primary99)",
                    100: "var(--md-ref-palette-primary100)",
                },
                'secondary': {
                    0: "var(--md-ref-palette-secondary0)",
                    5: "var(--md-ref-palette-secondary5)",
                    10: "var(--md-ref-palette-secondary10)",
                    15: "var(--md-ref-palette-secondary15)",
                    20: "var(--md-ref-palette-secondary20)",
                    25: "var(--md-ref-palette-secondary25)",
                    30: "var(--md-ref-palette-secondary30)",
                    40: "var(--md-ref-palette-secondary40)",
                    50: "var(--md-ref-palette-secondary50)",
                    60: "var(--md-ref-palette-secondary60)",
                    70: "var(--md-ref-palette-secondary70)",
                    80: "var(--md-ref-palette-secondary80)",
                    90: "var(--md-ref-palette-secondary90)",
                    95: "var(--md-ref-palette-secondary95)",
                    99: "var(--md-ref-palette-secondary99)",
                    100: "var(--md-ref-palette-secondary100)",
                },
                'tertiary': {
                    0: "var(--md-ref-palette-tertiary0)",
                    5: "var(--md-ref-palette-tertiary5)",
                    10: "var(--md-ref-palette-tertiary10)",
                    15: "var(--md-ref-palette-tertiary15)",
                    20: "var(--md-ref-palette-tertiary20)",
                    25: "var(--md-ref-palette-tertiary25)",
                    30: "var(--md-ref-palette-tertiary30)",
                    40: "var(--md-ref-palette-tertiary40)",
                    50: "var(--md-ref-palette-tertiary50)",
                    60: "var(--md-ref-palette-tertiary60)",
                    70: "var(--md-ref-palette-tertiary70)",
                    80: "var(--md-ref-palette-tertiary80)",
                    90: "var(--md-ref-palette-tertiary90)",
                    95: "var(--md-ref-palette-tertiary95)",
                    100: "var(--md-ref-palette-tertiary100)",
                },
                'neutral': {
                    0: "var(--md-ref-palette-neutral0)",
                    4: "var(--md-ref-palette-neutral4)",
                    5: "var(--md-ref-palette-neutral5)",
                    6: "var(--md-ref-palette-neutral6)",
                    10: "var(--md-ref-palette-neutral10)",
                    12: "var(--md-ref-palette-neutral12)",
                    15: "var(--md-ref-palette-neutral15)",
                    17: "var(--md-ref-palette-neutral17)",
                    20: "var(--md-ref-palette-neutral20)",
                    22: "var(--md-ref-palette-neutral22)",
                    24: "var(--md-ref-palette-neutral24)",
                    25: "var(--md-ref-palette-neutral25)",
                    30: "var(--md-ref-palette-neutral30)",
                    40: "var(--md-ref-palette-neutral40)",
                    50: "var(--md-ref-palette-neutral50)",
                    60: "var(--md-ref-palette-neutral60)",
                    70: "var(--md-ref-palette-neutral70)",
                    80: "var(--md-ref-palette-neutral80)",
                    90: "var(--md-ref-palette-neutral90)",
                    95: "var(--md-ref-palette-neutral95)",
                    100: "var(--md-ref-palette-neutral100)",
                },
                'neutral-variant': {
                    0: "var(--md-ref-palette-neutral-variant0)",
                    5: "var(--md-ref-palette-neutral-variant5)",
                    10: "var(--md-ref-palette-neutral-variant10)",
                    15: "var(--md-ref-palette-neutral-variant15)",
                    20: "var(--md-ref-palette-neutral-variant20)",
                    25: "var(--md-ref-palette-neutral-variant25)",
                    30: "var(--md-ref-palette-neutral-variant30)",
                    40: "var(--md-ref-palette-neutral-variant40)",
                    50: "var(--md-ref-palette-neutral-variant50)",
                    60: "var(--md-ref-palette-neutral-variant60)",
                    70: "var(--md-ref-palette-neutral-variant70)",
                    80: "var(--md-ref-palette-neutral-variant80)",
                    90: "var(--md-ref-palette-neutral-variant90)",
                    95: "var(--md-ref-palette-neutral-variant95)",
                    99: "var(--md-ref-palette-neutral-variant99)",
                    100: "var(--md-ref-palette-neutral-variant100)",
                },
            },
            'primary': {
                DEFAULT: "rgb(var(--md-sys-color-primary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-primary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-primary-dark-rgb) / <alpha-value>)",
            },
            "on-primary": {
                DEFAULT: "rgb(var(--md-sys-color-on-primary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-primary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-primary-dark-rgb) / <alpha-value>)",
            },
            "primary-container": {
                DEFAULT: "rgb(var(--md-sys-color-primary-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-primary-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-primary-container-dark-rgb) / <alpha-value>)",
            },
            "on-primary-container": {
                DEFAULT: "rgb(var(--md-sys-color-on-primary-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-primary-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-primary-container-dark-rgb) / <alpha-value>)",
            },
            'secondary': {
                DEFAULT: "rgb(var(--md-sys-color-secondary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-secondary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-secondary-dark-rgb) / <alpha-value>)",
            },
            "on-secondary": {
                DEFAULT: "rgb(var(--md-sys-color-on-secondary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-secondary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-secondary-dark-rgb) / <alpha-value>)",
            },
            "secondary-container": {
                DEFAULT: "rgb(var(--md-sys-color-secondary-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-secondary-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-secondary-container-dark-rgb) / <alpha-value>)",
            },
            "on-secondary-container": {
                DEFAULT: "rgb(var(--md-sys-color-on-secondary-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-secondary-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-secondary-container-dark-rgb) / <alpha-value>)",
            },
            'tertiary': {
                DEFAULT: "rgb(var(--md-sys-color-tertiary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-tertiary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-tertiary-dark-rgb) / <alpha-value>)",
            },
            "on-tertiary": {
                DEFAULT: "rgb(var(--md-sys-color-on-tertiary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-tertiary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-tertiary-dark-rgb) / <alpha-value>)",
            },
            "tertiary-container": {
                DEFAULT: "rgb(var(--md-sys-color-tertiary-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-tertiary-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-tertiary-container-dark-rgb) / <alpha-value>)",
            },
            "on-tertiary-container": {
                DEFAULT: "rgb(var(--md-sys-color-on-tertiary-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-tertiary-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-tertiary-container-dark-rgb) / <alpha-value>)",
            },
            'surface': {
                DEFAULT: "rgb(var(--md-sys-color-surface-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-dark-rgb) / <alpha-value>)",
            },
            "on-surface": {
                DEFAULT: "rgb(var(--md-sys-color-on-surface-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-surface-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-surface-dark-rgb) / <alpha-value>)",
            },
            'background': {
                DEFAULT: "rgb(var(--md-sys-color-background-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-background-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-background-dark-rgb) / <alpha-value>)",
            },
            "on-background": {
                DEFAULT: "rgb(var(--md-sys-color-on-background-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-background-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-background-dark-rgb) / <alpha-value>)",
            },
            "surface-variant": {
                DEFAULT: "rgb(var(--md-sys-color-surface-variant-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-variant-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-variant-dark-rgb) / <alpha-value>)",
            },
            "on-surface-variant": {
                DEFAULT: "rgb(var(--md-sys-color-on-surface-variant-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-surface-variant-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-surface-variant-dark-rgb) / <alpha-value>)",
            },
            'error': {
                DEFAULT: "rgb(var(--md-sys-color-error-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-error-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-error-dark-rgb) / <alpha-value>)",
            },
            "on-error": {
                DEFAULT: "rgb(var(--md-sys-color-on-error-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-error-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-error-dark-rgb) / <alpha-value>)",
            },
            "error-container": {
                DEFAULT: "rgb(var(--md-sys-color-error-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-error-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-error-container-dark-rgb) / <alpha-value>)",
            },
            "on-error-container": {
                DEFAULT: "rgb(var(--md-sys-color-on-error-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-error-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-error-container-dark-rgb) / <alpha-value>)",
            },
            "inverse-primary": {
                DEFAULT: "rgb(var(--md-sys-color-inverse-primary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-inverse-primary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-inverse-primary-dark-rgb) / <alpha-value>)",
            },
            "on-inverse-primary": {
                DEFAULT: "rgb(var(--md-sys-color-on-inverse-primary-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-inverse-primary-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-inverse-primary-dark-rgb) / <alpha-value>)",
            },
            'outline': {
                DEFAULT: "rgb(var(--md-sys-color-outline-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-outline-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-outline-dark-rgb) / <alpha-value>)",
            },
            "outline-variant": {
                DEFAULT: "rgb(var(--md-sys-color-outline-variant-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-outline-variant-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-outline-variant-dark-rgb) / <alpha-value>)",
            },
            'scrim': {
                DEFAULT: "rgb(var(--md-sys-color-scrim-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-scrim-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-scrim-dark-rgb) / <alpha-value>)",
            },
            // Fixed Colors


            // Surface Levels
            "surface-level-1": {
                DEFAULT: "var(--md-sys-color-surface-level1)",
                light: "var(--md-sys-color-surface-level1-light)",
                dark: "var(--md-sys-color-surface-level1-dark)",
            },

            "surface-level-2": {
                DEFAULT: "var(--md-sys-color-surface-level2)",
                light: "var(--md-sys-color-surface-level2-light)",
                dark: "var(--md-sys-color-surface-level2-dark)",
            },

            "surface-level-3": {
                DEFAULT: "var(--md-sys-color-surface-level3)",
                light: "var(--md-sys-color-surface-level3-light)",
                dark: "var(--md-sys-color-surface-level3-dark)",
            },

            "surface-level-4": {
                DEFAULT: "var(--md-sys-color-surface-level4)",
                light: "var(--md-sys-color-surface-level4-light)",
                dark: "var(--md-sys-color-surface-level4-dark)",
            },

            "surface-level-5": {
                DEFAULT: "var(--md-sys-color-surface-level5)",
                light: "var(--md-sys-color-surface-level5-light)",
                dark: "var(--md-sys-color-surface-level5-dark)",
            },

            // Surface Container
            'surface-dim': {
                DEFAULT: "rgb(var(--md-sys-color-surface-dim-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-dim-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-dim-dark-rgb) / <alpha-value>)",
            },
            'surface-bright': {
                DEFAULT: "rgb(var(--md-sys-color-surface-bright-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-bright-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-bright-dark-rgb) / <alpha-value>)",
            },
            'surface-container-lowest': {
                DEFAULT: "rgb(var(--md-sys-color-surface-container-lowest-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-container-lowest-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-container-lowest-dark-rgb) / <alpha-value>)",
            },
            'surface-container-low': {
                DEFAULT: "rgb(var(--md-sys-color-surface-container-low-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-container-low-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-container-low-dark-rgb) / <alpha-value>)",
            },
            'surface-container': {
                DEFAULT: "rgb(var(--md-sys-color-surface-container-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-container-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-container-dark-rgb) / <alpha-value>)",
            },
            'surface-container-high': {
                DEFAULT: "rgb(var(--md-sys-color-surface-container-high-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-container-high-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-container-high-dark-rgb) / <alpha-value>)",
            },
            'surface-container-highest': {
                DEFAULT: "rgb(var(--md-sys-color-surface-container-highest-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-container-highest-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-container-highest-dark-rgb) / <alpha-value>)",
            },
        },
        extend: {
            height: {
                screen: '100dvh',
            },
            width: {
                screen: '100dvw',
                100: '100px',
                200: '200px',
                320: '320px',
                360: '360px',
                400: '400px',
                480: '480px',
                560: '560px',
                600: '600px',
                720: '720px',
            },
            minWidth: {
                100: '100px',
                200: '200px',
                320: '320px',
                360: '360px',
                400: '400px',
                480: '480px',
                560: '560px',
                600: '600px',
                720: '720px',
            },
            maxWidth: {
                100: '100px',
                200: '200px',
                360: '360px',
                400: '400px',
                480: '480px',
                560: '560px',
                600: '600px',
                720: '720px',
            },
            borderWidth: {
                thin: 'thin',
            },
            screens: {
                compact: "0px",
                medium: "600px",
                expanded: "840px",
            },
            boxShadow: {
                "shadow-xs": "0px 1px 2px rgba(0, 0, 0, 0.14), 0px 1px 1px rgba(0, 0, 0, 0.12), 0px 2px 1px rgba(0, 0, 0, 0.2)",
                "shadow-sm": "0px 1px 3px rgba(0, 0, 0, 0.12), 0px 1px 2px rgba(0, 0, 0, 0.24)",
                "shadow": "0px 1px 5px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.08)",
                "shadow-md": "0px 4px 6px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08)",
                "shadow-md-2": "0px 4px 6px rgba(0, 0, 0, 0.12), 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 0px 1px rgba(0, 0, 0, 0.08)",
                "shadow-lg": "0px 10px 20px rgba(0, 0, 0, 0.12), 0px 3px 5px rgba(0, 0, 0, 0.08)",
                "shadow-xl": "0px 15px 30px rgba(0, 0, 0, 0.16), 0px 5px 10px rgba(0, 0, 0, 0.08)",
                "shadow-2xl": "0px 20px 40px rgba(0, 0, 0, 0.16)",
                "shadow-inner": "inset 0px 2px 4px rgba(0, 0, 0, 0.12)",
                "shadow-none": "none",
                'shadow-left': 'inset -2px 0 0 0 rgb(0 0 0 / 20)',
            },
            outline: {
                thin: 'thin',
            },
            borderRadius: {
                'sm': '8px',
                'md': '12px',
                'lg': '16px',
                'xl': '28px',
                '3.5xl': '28px',
            },
            gridTemplateColumns: {
                'scheme': "repeat(4, minmax(100px, 1fr))",
                'palette': 'repeat(13, 1fr)',
            },
            fontFamily: {
                sans: [
                    "Open_Sans var, sans-serif",
                    {
                        fontFeatureSettings: '"cv11", "ss01"',
                        fontVariationSettings: '"opsz" 32'
                    },
                ],
                serif: ["Open Sans", 'sans-serif'],
            },
            fontSize: {
                'display-large': ['57px', {
                    letterSpacing: '-0.25px',
                    lineHeight: '64px',
                    fontWeight: '400',
                }],
                'display-medium': ['45px', {
                    letterSpacing: '0px',
                    lineHeight: '52px',
                    fontWeight: '400',
                }],
                'display-small': ['36px', {
                    letterSpacing: '0px',
                    lineHeight: '44px',
                    fontWeight: '400',
                }],

                'headline-large': ['32px', {
                    letterSpacing: '0px',
                    lineHeight: '40px',
                    fontWeight: '400',
                }],
                'headline-medium': ['28px', {
                    letterSpacing: '0px',
                    lineHeight: '36px',
                    fontWeight: '400',
                }],
                'headline-small': ['24px', {
                    letterSpacing: '0px',
                    lineHeight: '32px',
                    fontWeight: '400',
                }],
                'title-large': ['22px', {
                    letterSpacing: '0px',
                    lineHeight: '28px',
                    fontWeight: '400',
                }],
                'title-medium': ['16px', {
                    letterSpacing: '0.15000000596046448px',
                    lineHeight: '24px',
                    fontWeight: '500',
                }],
                'title-small': ['14px', {
                    letterSpacing: '0.10000000149011612px',
                    lineHeight: '20px',
                    fontWeight: '500',
                }],
                'label-large': ['14px', {
                    letterSpacing: '0.10000000149011612px',
                    lineHeight: '20px',
                    fontWeight: '500',
                }],
                'label-medium': ['12px', {
                    letterSpacing: '0.5px',
                    lineHeight: '16px',
                    fontWeight: '500',
                }],
                'label-small': ['11px', {
                    letterSpacing: '0.5px',
                    lineHeight: '16px',
                    fontWeight: '500',
                }],
                'body-large': ['16px', {
                    letterSpacing: '0.5px',
                    lineHeight: '24px',
                    fontWeight: '400',
                }],
                'body-medium': ['14px', {
                    letterSpacing: '0.25px',
                    lineHeight: '20px',
                    fontWeight: '400',
                }],
                'body-small': ['12px', {
                    letterSpacing: '0.4000000059604645px;',
                    lineHeight: '16px',
                    fontWeight: '400',
                }],
            },
        },
    },
} as Config
