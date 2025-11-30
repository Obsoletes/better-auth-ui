import { auth, SocialProviders } from "lib/auth";
import type { Route } from "./+types/signin";

import { SignIn } from "~/sign-up";

export const loader = async (args: Route.LoaderArgs) => {
  return {
    socialProviders: SocialProviders,
  };
};

export default function SignInPage(args: Route.ComponentProps) {
  return <SignIn />;
}
