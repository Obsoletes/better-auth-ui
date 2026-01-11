import { createAuthClient } from "better-auth/client";
import {
  apiKeyClient,
  jwtClient,
  twoFactorClient,
} from "better-auth/client/plugins";
import { passkeyClient } from "@better-auth/passkey/client";
import { checkNameOrEmailClient } from "./Plugin/checkNameOrEmailClient";
export const authClient = createAuthClient({
  plugins: [
    twoFactorClient(),
    passkeyClient(),
    apiKeyClient(),
    jwtClient(),
    checkNameOrEmailClient(),
  ],
});
