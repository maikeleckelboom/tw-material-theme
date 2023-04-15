import {nameFromKey} from "./nameFromKey";

/**
 * Generates a contrast token from a given key.
 *
 * @param {string} token The key to generate the contrast token from.
 * @param {Object} options An optional object that contains the prefix and suffix for the token.
 * @param {string} options.prefix The prefix to add to the token (default: 'md-sys-color-').
 * @param {string} options.suffix The suffix to add to the token (default: '').
 * @returns {string} The generated contrast token.
 */
export function contrastToken(token: string, options: {
    prefix?: string
    suffix?: string
} = {}) {
    const {prefix = 'md-sys-color-', suffix = ''} = options
    const name = nameFromKey(token).toLowerCase().split(' ')
    // Check if the token specifies a text color
    const isTextColor = name.includes('on')
    if (isTextColor) {
        // Handle text-color
        name.splice(name.indexOf('on'), 1)
        return `${prefix}${name.join('-')}${suffix}`
    }
    // Check if the token specifies an inverse color
    const isInverseColor = name.includes('inverse')
    if (isInverseColor) {
        name.splice(name.indexOf('inverse'), 1)
        return `${prefix}${name.join('-')}${suffix}`
    }
    // If the token doesn't specify a text color
    // or an inverse color, use the default prefix
    return `${prefix}on-${name.join('-')}${suffix}`
}
