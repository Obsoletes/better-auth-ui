import {
  Button,
  Divider,
  FormGroup,
  TextField,
  useTheme,
  type SxProps,
  type TextFieldProps,
  type Theme,
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import GitHubIcon from "@mui/icons-material/GitHub";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { SignInButton } from "./signIn-button";
import { useState } from "react";

const mergeSlotSx = (
  defaultSx: SxProps<Theme>,
  slotProps?: { sx?: SxProps<Theme> }
) => {
  if (Array.isArray(slotProps?.sx)) {
    return [defaultSx, ...slotProps.sx];
  }

  if (slotProps?.sx) {
    return [defaultSx, slotProps?.sx];
  }

  return [defaultSx];
};

const getCommonTextFieldProps = (
  theme: Theme,
  baseProps: TextFieldProps = {}
): TextFieldProps => ({
  required: true,
  fullWidth: true,
  ...baseProps,
  slotProps: {
    ...baseProps.slotProps,
    htmlInput: {
      ...baseProps.slotProps?.htmlInput,
      sx: mergeSlotSx(
        {
          paddingTop: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        typeof baseProps.slotProps?.htmlInput === "function"
          ? {}
          : baseProps.slotProps?.htmlInput
      ),
    },
    inputLabel: {
      ...baseProps.slotProps?.inputLabel,
      sx: mergeSlotSx(
        {
          lineHeight: theme.typography.pxToRem(12),
          fontSize: theme.typography.pxToRem(14),
        },
        typeof baseProps.slotProps?.inputLabel === "function"
          ? {}
          : baseProps.slotProps?.inputLabel
      ),
    },
  },
});
type UserNameProps = {
  onNext: (v: string) => void;
};
export const UserName = (prop: UserNameProps) => {
  const theme = useTheme();
  const [value, setValue] = useState("");
  const onNext = (e: React.FormEvent) => {
    prop.onNext(value);
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onNext(e);
    }
  };
  return (
    <>
      <TextField
        {...getCommonTextFieldProps(theme, {
          placeholder: "Username or Email",
          id: "name",
          name: "name",
          type: "text",
          autoComplete: "email",
          autoFocus: true,
          margin: "normal",
          value: value,
          onChange: (e) => setValue(e.target.value),
        })}
        onKeyDown={onKeyDown}
      />
      <Button
        onClick={onNext}
        endIcon={<NavigateNextIcon />}
        loadingPosition="end"
        variant="outlined"
        fullWidth
        type="submit"
      >
        Continue
      </Button>
      <Divider>or</Divider>
      <SignInButton Label="Github" Icon={<GitHubIcon />} />
      <SignInButton Label="Microsoft" Icon={<MicrosoftIcon />} />
    </>
  );
};
