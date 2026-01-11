import {
  Button,
  Stack,
  TextField,
  Typography,
  useTheme,
  type SxProps,
  type TextFieldProps,
  type Theme,
} from '@mui/material';
import { type ActionDispatch } from 'react';
import { Link as RouterLink } from 'react-router';
import type { ActionType, RegisterProps, StateType } from './types';

type Props = {
  onRegister: () => void;
  state: StateType;
  reducer: ActionDispatch<[action: ActionType]>;
} & RegisterProps;

export const RegisterNewUser = (prop: Props) => {
  const theme = useTheme();
  const { reducer, state } = prop;

  const mergeSlotSx = (
    defaultSx: SxProps<Theme>,
    slotProps?: { sx?: SxProps<Theme> },
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
    baseProps: TextFieldProps = {},
  ): TextFieldProps => ({
    required: true,
    fullWidth: true,
    margin: 'normal',
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
          typeof baseProps.slotProps?.htmlInput === 'function'
            ? {}
            : baseProps.slotProps?.htmlInput,
        ),
      },
      inputLabel: {
        ...baseProps.slotProps?.inputLabel,
        sx: mergeSlotSx(
          {
            lineHeight: theme.typography.pxToRem(12),
            fontSize: theme.typography.pxToRem(14),
          },
          typeof baseProps.slotProps?.inputLabel === 'function'
            ? {}
            : baseProps.slotProps?.inputLabel,
        ),
      },
    },
  });
  return (
    <Stack
      component="form"
      onSubmit={prop.onRegister}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.paper',
        gap: 1,
      }}
    >
      <img
        src="https://mui.com/static/logo.svg"
        alt="MUI logo"
        style={{ height: 24 }}
      />
      <Typography
        variant="h5"
        component="h1"
        color="textPrimary"
        sx={{
          textAlign: 'center',
          fontWeight: 600,
        }}
      >
        注册
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        gutterBottom
        textAlign="center"
      >
        创建新账号，开始你的体验
      </Typography>

      <TextField
        {...getCommonTextFieldProps({
          label: '邮箱',
          name: 'email',
          type: 'email',
          autoFocus: true,
          value: state.email,
          onChange: (e) =>
            reducer({ type: 'set-email', payload: e.target.value }),
          disabled: prop.hasEmail,
          InputProps: { readOnly: prop.hasEmail },
          placeholder: 'email@example.com',
          slotProps: {
            inputLabel: {
              shrink: prop.hasEmail || !!state.email,
            },
          },
        })}
      />
      <TextField
        {...getCommonTextFieldProps({
          label: '用户名',
          name: 'name',
          value: state.name,
          onChange: (e) =>
            reducer({ type: 'set-name', payload: e.target.value }),
          placeholder: 'yourname',
        })}
      />
      <TextField
        {...getCommonTextFieldProps({
          label: '密码',
          name: 'password',
          type: 'password',
          value: state.password,
          onChange: (e) =>
            reducer({ type: 'set-password', payload: e.target.value }),
          placeholder: '输入密码',
        })}
      />
      <Button type="submit" variant="outlined" fullWidth loadingPosition="end">
        注册
      </Button>
      <Button component={RouterLink} to="/login" variant="text" fullWidth>
        返回登录
      </Button>
    </Stack>
  );
};
