import {
  alpha,
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
  Slide,
} from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { SwitchTransition } from "react-transition-group";
import { UserName } from "./user-name";
import { Step, type EStep } from "./types";
import { Loading } from "./loading";
import { ChooseMethod } from "./choose-method";
import { authClient } from "lib/auth-client";
export const SignIn = () => {
  const theme = useTheme();
  const [state, setState] = useState<EStep>(Step.UserName);
  useEffect(() => {
    authClient.getSession();
  }, []);
  const handleClick = async () => {
    if (state === Step.UserName) {
      setState(Step.Loading);
      const result = await authClient.check.checknameemail({
        query: { nameOrEmail: "vv" },
      });
      const exists = result.data?.exists ?? false;
      setState(Step.SignUp);
    } else {
      setState(Step.Loading);
      setTimeout(() => {
        setState(Step.UserName);
      }, 2000);
    }
  };
  const containerRef = useRef(null);
  const step = (() => {
    switch (state) {
      case Step.UserName:
        return <UserName onNext={handleClick} />;
      case Step.Loading:
        return <Loading />;
      case Step.ChooseMethod:
        return <ChooseMethod />;
      default:
        return <p>Error</p>;
    }
  })();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          border: "1px solid",
          borderColor: alpha(theme.palette.grey[400], 0.4),
          p: 8,
          borderRadius: 1,
          boxShadow: theme.shadows[4],
        }}
        ref={containerRef}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            bgcolor: "background.paper",
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
              textAlign: "center",
              fontWeight: 600,
            }}
          >
            登录
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            gutterBottom
            textAlign="center"
          >
            欢迎用户，请登录以继续
          </Typography>
        </Stack>
        <SwitchTransition>
          <Slide
            direction="right"
            mountOnEnter
            unmountOnExit
            container={containerRef.current}
            key={0}
            appear={false}
          >
            <Stack
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "background.paper",
                gap: 1,
                minHeight: "200px",
                justifyContent: "center",
              }}
            >
              {step}
            </Stack>
          </Slide>
        </SwitchTransition>
      </Container>
    </Box>
  );
};

type Res = {
  data: { exists: boolean } | null;
  err: any;
};
