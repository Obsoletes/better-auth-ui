import {
  alpha,
  Container,
  Stack,
  Typography,
  useTheme,
  Slide,
} from "@mui/material";
import { useRef, useState } from "react";
import { SwitchTransition } from "react-transition-group";
import { useNavigate } from "react-router";
import { UserName } from "./user-name";
import { Step, type EStep } from "./types";
import { ChooseMethod } from "./choose-method";
import { authClient } from "lib/auth-client";
import { Loading } from "../Share/loading";
export const Login = () => {
  const theme = useTheme();
  const [state, setState] = useState<EStep>(Step.UserName);
  const navigate = useNavigate();
  const handleClick = async (value: string) => {
    if (state !== Step.UserName) {
      setState(Step.UserName);
      return;
    }
    setState(Step.Loading);
    try {
      const result = await authClient.check.checknameemail({
        query: { nameOrEmail: value },
      });
      const exists = result.data?.exists ?? false;
      if (exists) {
        setState(Step.ChooseMethod);
      } else {
        const search = value ? `?email=${encodeURIComponent(value)}` : "";
        navigate(`/register${search}`);
      }
    } catch (error) {
      setState(Step.UserName);
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
            component="form"
            onSubmit={() => handleClick("")}
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
  );
};
