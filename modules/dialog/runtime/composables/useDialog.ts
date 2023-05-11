import ConfirmDialog from "~/modules/dialog/runtime/components/ConfirmDialog.vue";
import TextDialog from "~/modules/dialog/runtime/components/TextDialog.vue";
import { Component } from "vue";
import { KeyColors } from "~";
import { BasicDialog, ColorPickerDialog } from "#components";

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
  type?: "basic" | "fullScreen";
  divider?: boolean;
  okLabel?: string;
  cancelLabel?: string;
  icon?: string;
  title?: string;
  text?: string;
  template?: string;
  actions?: Record<string, (dialog: DialogInstance) => void>;
  header?: {
    actions?: Record<string, (dialog: DialogInstance) => void>
  };
}

export async function confirmDialog(text: string): Promise<any> {
  const dialog = useDialog();
  return dialog.open(ConfirmDialog, { text });
}

export async function textDialog(text: string) {
  const dialog = useDialog();
  return await dialog.open(TextDialog, { text });
}

export async function basicDialog(options: DialogProps) {
  const dialog = useDialog();
  return await dialog.open(BasicDialog, options);
}

export async function colorPickerDialog(
  props: DialogProps & { keyColorName: keyof KeyColors }
) {
  const dialog = useDialog();
  return await dialog.open(ColorPickerDialog, {
    ...props,
    title: props?.title ?? "HCT Color Picker",
    icon: props?.icon ?? "ic:outline-color-lens",
    text: props?.text ?? "Fine-tune the color of this key."
  });
}

export function useDialog() {
  const instance = useState<DialogInstance | undefined>(
    "dialog-instance",
    undefined
  );

  function open(dialog: any, props?: any): Promise<any> {
    instance.value = {
      dialog: markRaw(dialog),
      props: props ?? {},
      reject: () => {
      },
      resolve: () => {
      }
    };
    return new Promise((resolve, reject) => {
      instance.value!.resolve = resolve;
      instance.value!.reject = reject;
    });
  }

  function close(payload?: any) {
    if (!instance.value) return;
    instance.value.resolve(payload);
    instance.value = undefined;
  }

  const resolve = (data?: any) => close(data ?? true);
  const reject = () => close(null);

  return {
    instance,
    open,
    resolve,
    reject
  };
}
