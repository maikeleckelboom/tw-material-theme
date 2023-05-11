import { tokenize } from "@webhead/material-color-properties";
import { contrastToken } from "~/modules/theme/runtime/utils/contrastToken";

export type TokenFormatOptions = { prefix?: string; suffix?: string };

export const styleFromToken = (
  token: string,
  { prefix, suffix }: TokenFormatOptions = {
    prefix: "md-sys-color-",
    suffix: "",
  }
) => ({
  backgroundColor: `var(--${prefix}${tokenize(token)}${suffix})`,
  color: `var(--${contrastToken(token, { prefix, suffix })})`,
});
