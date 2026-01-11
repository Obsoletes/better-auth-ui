import { SocialProviders } from "lib/auth";
import type { Route } from "./+types/signin";

export const loader = async (args: Route.LoaderArgs) => {
  return {
    socialProviders: SocialProviders,
  };
};

export default function SignInPage(args: Route.ComponentProps) {
  return <div></div>;
}
