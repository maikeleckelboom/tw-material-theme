import {DirectiveBinding} from "@vue/runtime-core"

export default defineNuxtPlugin((nuxtApp) => {
    const DEFAULT_DURATION: number = 700 as const
    const DEFAULT_COLOR: string = 'var(--ripple-color, rgb(var(--md-sys-color-primary-rgb) / 0.4))' as const

    const textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: var(--ripple-color, ${DEFAULT_COLOR});
            animation: ripple var(--ripple-duration, ${DEFAULT_DURATION}ms) cubic-bezier(0.4, 0, 0.2, 1);
            height: var(--ripple-diameter);
            width: var(--ripple-diameter);
            transform: scale(0);
            pointer-events: none;
            z-index: 0;
        }
        @keyframes ripple {
            to {
                opacity: 0;
                transform: scale(2);
            }
        }
    `
    useHead({style: [{id: 'directives.ripple', textContent}]})

    const createRipple = (diameter: number, x: number, y: number, options?: { color?: string, duration?: number }) => {
        const ripple = document.createElement('div')
        ripple.style.left = `${x - diameter / 2}px`
        ripple.style.top = `${y - diameter / 2}px`
        ripple.style.setProperty('--ripple-diameter', `${diameter}px`)
        options?.color && ripple.style.setProperty('--ripple-color', options.color)
        options?.duration && ripple.style.setProperty('--ripple-duration', `${options.duration}ms`)
        ripple.classList.add('ripple')
        return ripple
    }

    const getBindingColorValue = (binding?: DirectiveBinding) => {
        if (!binding?.value) return
        if (typeof binding.value === 'string') {
            return binding.value
        }
        if (typeof binding.value === 'object') {
            return binding.value.color
        }
    }

    const getBindingDurationValue = (binding?: DirectiveBinding, clientWidth: number = 0) => {
        return (binding?.value && typeof binding.value === 'object')
            ? binding.value.duration
            : DEFAULT_DURATION + (clientWidth * 0.5)
    }

    const getDiameter = (width: number, height: number) => {
        return Math.max(width, height);
    }

    const createAndRemoveRipple = ({currentTarget, offsetX, offsetY}: PointerEvent, binding?: DirectiveBinding) => {
        const el = currentTarget as HTMLElement
        const {clientWidth, clientHeight} = el
        const diameter = getDiameter(clientWidth, clientHeight)
        const color = getBindingColorValue(binding)
        const duration = getBindingDurationValue(binding, clientWidth)
        const ripple = createRipple(diameter, offsetX, offsetY, {color, duration})
        // const computedStyle = window.getComputedStyle(el)
        el.appendChild(ripple)
        setTimeout(() => ripple.remove(), duration)
    }
    nuxtApp.vueApp.directive('ripple', {
        mounted(el, binding) {
            console.log('ripple mounted', binding, binding.value)
            if (binding.value === false) {
                console.log('ripple disabled')
                return
            }
            el.addEventListener('pointerdown',
                (ev: PointerEvent) => createAndRemoveRipple(ev, binding)
            )
        },
        unmounted(el, binding) {
            el.removeEventListener('pointerdown',
                (ev: PointerEvent) => createAndRemoveRipple(ev, binding)
            )
        },
    })
})
