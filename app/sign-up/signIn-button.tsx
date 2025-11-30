import { Button } from "@mui/material";

type SignInButtonProps = {
  Icon: React.ReactNode;
  Label: string;
};

export const SignInButton = (prop: SignInButtonProps) => {
  return (
    <Button
      key={prop.Label}
      variant="outlined"
      fullWidth
      size="large"
      disableElevation
      name="sign-in"
      startIcon={prop.Icon}
      sx={{
        textTransform: "capitalize",
      }}
      onClick={console.dir}
    >
      <span>Sign in with {prop.Label}</span>
    </Button>
  );
};
