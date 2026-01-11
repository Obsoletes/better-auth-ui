import { SignInButton } from "./signIn-button";
import FingerprintIcon from "@mui/icons-material/Fingerprint";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";

export const ChooseMethod = () => {
  return (
    <>
      <SignInButton Label="passkey" Icon={<FingerprintIcon />} />
      <SignInButton Label="authenticator" Icon={<AccountCircleIcon />} />
      <SignInButton Label="Password" Icon={<PasswordIcon />} />
    </>
  );
};
