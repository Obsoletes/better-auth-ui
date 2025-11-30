import { createAuthClient } from "better-auth/client";
import {
  apiKeyClient,
  jwtClient,
  passkeyClient,
  twoFactorClient,
  usernameClient,
} from "better-auth/client/plugins";
import { checkNameOrEmailClient } from "./Plugin/checkNameOrEmailClient";
export const authClient = createAuthClient({
  plugins: [
    twoFactorClient(),
    usernameClient(),
    passkeyClient(),

    apiKeyClient(),
    jwtClient(),
    checkNameOrEmailClient(),
  ],
});
