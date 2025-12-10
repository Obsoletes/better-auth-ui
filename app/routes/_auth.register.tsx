import type { Route } from "./+types/_auth.register";
import { z } from "zod";
const registerQuery = z.object({
  email: z.email(),
});
export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const query = registerQuery.safeParse({
    email: url.searchParams.get("email"),
  });
  if (query.success && query.data.email) {
    return {
      email: query.data.email,
      hasEmail: true,
    };
  } else
    return {
      hasEmail: false,
    };
}

export default function RegisterPage(args: Route.ComponentProps) {
  return <h1>{JSON.stringify(args.loaderData)}</h1>;
}
