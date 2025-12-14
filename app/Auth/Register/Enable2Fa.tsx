import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Skeleton,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { useState } from 'react';
import { CodeInput } from '../Share/CodeInput';

const CodeSkeleton = styled(Skeleton)(({ theme }) => ({
  width: '6.5em',
}));

type Props = {
  open: boolean;
  onClose: (success: boolean) => void;
  totpDataUrl: string;
  backupCodes: string[];
};
export const Enable2FA = (prop: Props) => {
  const [code, setCode] = useState('');
  return (
    <Dialog open={prop.open} onClose={() => prop.onClose(false)}>
      <DialogTitle>启用双因素认证（2FA）</DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Typography variant="body2" color="text.secondary" mt={1}>
            使用身份验证应用扫描二维码，输入生成的验证码以完成绑定。请保存备份代码以防丢失设备。
          </Typography>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            {prop.totpDataUrl ? (
              <Box
                component="img"
                src={prop.totpDataUrl}
                alt="2FA QR Code"
                sx={{ width: 240, height: 240 }}
              />
            ) : (
              <Skeleton
                variant="rectangular"
                width="240"
                height="240"
                sx={{ width: 240, height: 240 }}
              />
            )}

            <Typography variant="body2">
              请使用身份验证应用扫描此二维码
            </Typography>
          </Stack>
          <Grid container spacing={3}>
            <Card elevation={0} variant="elevation">
              <CardHeader
                title={
                  <Typography variant="subtitle1" fontWeight={600}>
                    备份代码
                  </Typography>
                }
                action={
                  <Stack direction="row" spacing={1}>
                    <IconButton aria-label="复制全部">
                      <ContentCopyIcon />
                    </IconButton>
                    <IconButton aria-label="下载备份代码">
                      <DownloadIcon />
                    </IconButton>
                  </Stack>
                }
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary" mb={2}>
                  请妥善保存以下备份代码。当您无法使用身份验证应用时，可使用这些代码登录。
                </Typography>

                <Grid container spacing={3}>
                  {prop.backupCodes.length === 0 ? (
                    <>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                      <Typography variant="body2">
                        <CodeSkeleton variant="text" />
                      </Typography>
                    </>
                  ) : (
                    prop.backupCodes.map((c) => (
                      <Typography key={c} variant="body2">
                        {c}
                      </Typography>
                    ))
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Card variant="outlined">
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={600}>
                  验证并启用
                </Typography>
                <CodeInput
                  onComplete={(c) => {
                    setCode(c);
                    console.dir(c);
                  }}
                  sx={{ alignSelf: 'center' }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Stack>
        <DialogActions>
          <Stack direction="row" spacing={2}>
            <Button variant="contained">验证并启用</Button>
            <Button variant="outlined" color="inherit">
              取消
            </Button>
          </Stack>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
