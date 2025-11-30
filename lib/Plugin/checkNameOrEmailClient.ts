import type { BetterAuthClientPlugin } from "better-auth";
import type { checkNameOrEmail } from "./checkNameOrEmail";

export const checkNameOrEmailClient = () => {
  return {
    id: "check-name-or-email-client",
    $InferServerPlugin: {} as ReturnType<typeof checkNameOrEmail>,
  } satisfies BetterAuthClientPlugin;
};
