import {Component, DefineComponent, shallowRef} from "vue"
import ConfirmDialog from "~/modules/dialog/runtime/components/ConfirmDialog.vue"
import TextDialog from "~/modules/dialog/runtime/components/TextDialog.vue"
import {DialogBasicDialog} from "#components"

type PropsType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<infer P, any, any> ? P : never;

type BindingReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, infer X, any> ? X extends { returnValue: () => infer Y } ? Y : never : never;

type MethodReturnType<C extends DefineComponent<any, any, any>> = C extends DefineComponent<any, any, infer X> ? X extends { returnValue: () => infer Y } ? Y : never : never;

type ReturnType<C extends DefineComponent<any, any, any>> = BindingReturnType<C> extends never ? MethodReturnType<C> : BindingReturnType<C>;

export interface DialogInstance {
    component?: any;
    dialog: Component;
    props: any;
    pending?: boolean;
    resolve: (data?: any) => void;
    reject: () => void;
    startLoading?: () => void;
    stopLoading?: () => void;
}

export interface DialogProps {
    type?: 'basic' | 'fullScreen';
    divider?: boolean;
    okLabel?: string;
    cancelLabel?: string;
    icon?: string;
    headline?: string;
    text: string;
    actions?: Record<string, (dialog: DialogInstance) => void>;
    header?: {
        actions?: Record<string, (dialog: DialogInstance) => void>
    }
}


export async function confirmDialog(text: string): Promise<any> {
    const dialog = useDialog()
    return dialog.open(ConfirmDialog, {text})
}

export async function textDialog(text: string) {
    const dialog = useDialog()
    return await dialog.open(TextDialog, {text})
}

export async function basicDialog(options: DialogProps) {
    const dialog = useDialog()
    return await dialog.open(DialogBasicDialog, options)
}

export function useDialog() {
    const instance = useState<DialogInstance | undefined>('dialog-instance', undefined)

    function open<C extends DefineComponent<any, any, any>>(dialog: C, props?: PropsType<C>): Promise<ReturnType<C>> {
        instance.value = {
            dialog: markRaw(dialog),
            props,
            reject: () => {
            },
            resolve: () => {
            }
        }
        return new Promise((resolve, reject) => {
            instance.value!.resolve = resolve
            instance.value!.reject = reject
        })
    }

    function close(payload?: any) {
        if (!instance.value) return
        instance.value.resolve(payload)
        instance.value = undefined
    }

    function startLoading() {
        if (!instance.value) return
        instance.value.pending = true
    }

    function stopLoading() {
        if (!instance.value) return
        instance.value.pending = false
    }

    const resolve = (data?: any) => close(data ?? true)

    const reject = () => close(null)


    return {
        instance,
        open,
        resolve,
        reject,
        startLoading,
        stopLoading
    }
}
