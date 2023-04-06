import type {Config} from 'tailwindcss'
import {isDevelopment} from "std-env";
import tailwindScrollbar from 'tailwind-scrollbar';
import tailwindTypography from '@tailwindcss/typography';
import {url} from "inspector";


export default {
    darkMode: ['class', 'dark-mode'],
    safelist: [
        {
            pattern: isDevelopment && /^(bg-)|(text-)/
        },
    ],
    plugins: [
        tailwindScrollbar,
        tailwindTypography
    ],
    corePlugins: {
        preflight: true,
    },
    content: [
        './components/**/*.vue',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './modules/**/*.{vue,js,ts}',
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    theme: {
        colors: {
            palette: {
                primary: {
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
                secondary: {
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
                tertiary: {
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
                neutral: {
                    0: "var(--md-ref-palette-neutral0)",
                    5: "var(--md-ref-palette-neutral5)",
                    10: "var(--md-ref-palette-neutral10)",
                    15: "var(--md-ref-palette-neutral15)",
                    20: "var(--md-ref-palette-neutral20)",
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
                "neutral-variant": {
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
            primary: {
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
            secondary: {
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
            tertiary: {
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
            surface: {
                DEFAULT: "rgb(var(--md-sys-color-surface-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-surface-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-surface-dark-rgb) / <alpha-value>)",
            },
            "on-surface": {
                DEFAULT: "rgb(var(--md-sys-color-on-surface-rgb) / <alpha-value>)",
                light: "rgb(var(--md-sys-color-on-surface-light-rgb) / <alpha-value>)",
                dark: "rgb(var(--md-sys-color-on-surface-dark-rgb) / <alpha-value>)",
            },
            background: {
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
            error: {
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
            transparent: "transparent",
            current: "currentColor",
            "surface-level-1": "rgb(var(--md-sys-color-primary-rgb) / 0.04)",
            "surface-level-2": "rgb(var(--md-sys-color-primary-rgb) / 0.08)",
            "surface-level-3": "rgb(var(--md-sys-color-primary-rgb) / 0.12)",
            "surface-level-4": "rgb(var(--md-sys-color-primary-rgb) / 0.18)",
            "surface-level-5": "rgb(var(--md-sys-color-primary-rgb) / 0.24)",
        },
        extend: {
            borderWidth: {
                1: "1px",
                'thin': 'thin',
            },
            screens: {
                compact: "480px",
                medium: "600px",
                expanded: "840px",
            },
            gridTemplateColumns: {
                scheme: "repeat(4, minmax(100px, 1fr))",
                palette: 'repeat(13, 1fr)',
                'aside-main-expanded': 'minmax(360px, 380px) 1fr',
                'aside-main-medium': '240px 1fr',
                'aside-main-compact': '1fr',

            },
            fontFamily: {
                // open sans
                sans: [
                    "Open Sans",
                ],
            }
        },
    },
} as Config

