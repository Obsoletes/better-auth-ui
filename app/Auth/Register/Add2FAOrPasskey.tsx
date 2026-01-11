import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Stack,
  styled,
  Typography,
  type CardProps,
} from '@mui/material';
import PhonelinkLock from '@mui/icons-material/PhonelinkLock';
import Key from '@mui/icons-material/Key';
import { authClient } from '@/lib/auth-client';
import { Enable2FA } from './Enable2Fa';
import { useState } from 'react';
import { toast } from 'react-toastify/unstyled';
import QRCode from 'qrcode';
import type { StateType } from './types';

const MethodCard = styled(Card)<CardProps>(({ theme }) => ({
  flex: 1,
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'action.selectedHover',
  },
}));
const MethodCardAction = styled(CardActionArea)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}));

type Props = {
  state: StateType;
};

export const Add2FAOrPasskey = (props: Props) => {
  const [open2FADialog, setOpen2FADialog] = useState(false);
  const [totpData, setTotpData] = useState({
    totpURI: '',
    backupCodes: [] as string[],
  });
  const onClose = () => {};
  const addPasskey = async () => {
    console.dir(
      await authClient.passkey.addPasskey({ name: 'My First Passkey' }),
    );
  };
  const enable2FA = async () => {
    setOpen2FADialog(true);
    const totp = await authClient.twoFactor.enable({
      issuer: 'Blog',
      password: props.state.password ?? 'testtest',
    });
    if (totp.error) {
      toast.error(`启用2FA失败：${totp.error.message}`);
    } else {
      setTimeout(async () => {
        setTotpData({
          totpURI: await QRCode.toDataURL(totp.data.totpURI),
          backupCodes: totp.data.backupCodes,
        });
      }, 1000);
    }
  };
  return (
    <Stack maxWidth="md">
      <Card variant="elevation" elevation={0}>
        <CardContent>
          <Typography variant="h3" textAlign="center" gutterBottom>
            Welcome!
          </Typography>

          <Typography textAlign="center" gutterBottom>
            Please take a moment to enhance your security using 2FA or Passkey.
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{
              justifyContent: 'space-evenly',
              alignItems: 'stretch',
            }}
          >
            <MethodCard elevation={2} variant="outlined" onClick={enable2FA}>
              <MethodCardAction disabled>
                <PhonelinkLock sx={{ fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>
                  Two-Factor Authentication
                </Typography>
                <Typography variant="caption">
                  Add 2FA for extra security protection.
                </Typography>
              </MethodCardAction>
            </MethodCard>
            <MethodCard elevation={2} variant="outlined" onClick={addPasskey}>
              <MethodCardAction>
                <Key sx={{ fontSize: 40 }} />
                <Typography variant="h6" gutterBottom>
                  Passkey
                </Typography>
                <Typography variant="caption">
                  Use passkey as an easy-to-use secure sign-in method.
                </Typography>
              </MethodCardAction>
            </MethodCard>
          </Stack>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" variant="outlined">
            Skip
          </Button>
        </CardActions>
      </Card>
      <Enable2FA
        open={open2FADialog}
        totpDataUrl={totpData.totpURI}
        backupCodes={totpData.backupCodes}
        onClose={onClose}
      />
    </Stack>
  );
};
