import {
  Button,
  Divider,
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
  onNext: () => void;
};
export const UserName = (prop: UserNameProps) => {
  const theme = useTheme();
  return (
    <>
      <TextField
        {...getCommonTextFieldProps(theme, {
          label: "User name",
          placeholder: "your@email.com",
          id: "name",
          name: "name",
          type: "text",
          autoComplete: "name",
          autoFocus: true,
        })}
      />
      <Button
        onClick={prop.onNext}
        endIcon={<NavigateNextIcon />}
        loadingPosition="end"
        variant="outlined"
        fullWidth
      >
        Next
      </Button>
      <Divider>or</Divider>
      <SignInButton Label="passkey" Icon={<GitHubIcon />} />
      <SignInButton Label="Github" Icon={<MicrosoftIcon />} />
    </>
  );
};
