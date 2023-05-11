import { InjectionKey, Ref } from "vue";

export const SIDE_SHEET_INJECTION_KEY = Symbol(
  "side-sheet-context"
) as InjectionKey<{
  isModal: Ref<boolean>;
  isOpened: Ref<boolean>;
  percentage: Ref<number>;
  close: () => void;
  open: () => void;
}>;
