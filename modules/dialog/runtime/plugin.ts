import {Component, DefineComponent, shallowRef} from 'vue'
import DialogWrapper from './components/DialogWrapper.vue'
import BasicDialog from './components/BasicDialog.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import TextDialog from './components/TextDialog.vue'

/**
 * Extracts the type of props from a component definition.
 */
type PropsType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<infer P, any, any> ? P : never;

/**
 * Extracts the return type of the dialog from the setup function.
 */
type BindingReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, infer X, any> ? X extends { returnValue: () => infer Y } ? Y : never : never;

/**
 * Extracts the return type of the dialog from the methods.
 */
type MethodReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, any, infer X> ? X extends { returnValue: () => infer Y } ? Y : never : never;

/**
 * Extracts the return type of the dialog either from the setup method or from the methods.
 */
type ReturnType<C extends DefineComponent<any, any, any>> = BindingReturnType<C> extends never ? MethodReturnType<C> : BindingReturnType<C>;

/**
 * Interface for the dialog dialogInstance.
 */
export interface DialogInstance {
    component?: any;
    dialog: Component;
    wrapper: string;
    props: any;
    resolve: (data?: any) => void;
}

export interface DialogProps {
    icon?: string;
    title?: string;
    text: string;
    actions?: Record<string, (dialog: DialogInstance) => void>;
    header?: {
        actions?: Record<string, (dialog: DialogInstance) => void>
    }
}

interface DialogOptions extends DialogProps {
    [key: string]: any;
}

/**
 * This is where the dialog dialogInstance is stored.
 */
export const dialogInstance = shallowRef<DialogInstance>()

/**
 * Opens a dialog.
 * @param dialog The dialog you want to open.
 * @param props The props to be passed to the dialog.
 * @param wrapper The dialog wrapper you want the dialog to open into.
 * @return A promise that resolves when the dialog is closed
 */
function open<C extends DefineComponent<any, any, any>>(dialog: C, props?: PropsType<C>, wrapper = 'default'): Promise<ReturnType<C>> {
    dialogInstance.value = {
        dialog,
        props,
        wrapper,
        resolve: () => {
        }
    }
    return new Promise((resolve) => {
        dialogInstance.value!.resolve = resolve
    })
}

/**
 * Closes the dialog. This is usually called from the dialog itself.
 * @return A promise that resolves when the dialog is closed
 * @internal This is an internal property and should not be used.
 * @ignore This is not part of the public API.
 * @private This is private and should not be used.
 * @param payload The data to be returned from the dialog.
 */
function close(payload?: any) {
    if (payload === undefined) {
        payload = dialogInstance.value?.component.returnValue()
    }
    dialogInstance.value!.resolve(payload)
    dialogInstance.value = undefined
}

/**
 * Composable for opening, closing and accessing the dialog.
 * @return The dialog dialogInstance.
 */
export function useDialog() {
    const resolve = (data?: any) => {
        if (!dialogInstance.value?.component.returnValue && data === undefined) {
            data = true
        }
        close(data)
    }
    const reject = (reason?: string) => close(reason ?? null)

    return {
        instance: dialogInstance,
        open,
        resolve,
        reject
    }
}

/**
 * Opens a confirm dialog.
 */
export async function confirm(text: string, props = {valid: true}): Promise<any> {
    const {$dialog} = useNuxtApp()
    // @ts-ignore
    return await $dialog.open(ConfirmDialog, {text, ...props})
}

/**
 * Opens a prompt dialog.
 */
export async function prompt(text: string) {
    const {$dialog} = useNuxtApp()
    console.log('prompt', text, $dialog)
    return await $dialog.open(TextDialog, {text})
}

/**
 * Opens a basic dialog.
 * @param options
 */
export async function openDialog(options: DialogOptions) {
    const {$dialog} = useNuxtApp()
    // @ts-ignore
    return await $dialog.open(BasicDialog, options)
}

// export async function openColorPicker(keyColor: string) {
//     const {$dialog} = useNuxtApp()
//     return $dialog.open(ColorPickerDialog, {
//         title: 'Color Picker',
//         component: toRaw(FormColorPicker),
//         keyColor,
//         keyColorText: new Map([
//             ['primary', 'Acts as custom source color'],
//             ['neutral', 'Used for background and surface colors'],
//         ]).get(keyColor)
//     })
// }


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.component('DialogWrapper', DialogWrapper)
    const dialog = useDialog()
    return {provide: {dialog}}
})
