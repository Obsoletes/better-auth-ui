import type { Route } from './+types/_auth.register';
import { Register } from '../Auth';
import { z } from 'zod';
const registerQuery = z.object({
  email: z.email(),
});
export async function loader(args: Route.LoaderArgs) {
  const url = new URL(args.request.url);
  const query = registerQuery.safeParse({
    email: url.searchParams.get('email'),
  });
  if (query.success && query.data.email) {
    return {
      email: query.data.email,
      hasEmail: true,
    } as const;
  } else
    return {
      hasEmail: false,
    } as const;
}

export default function RegisterPage(args: Route.ComponentProps) {
  const loaderData = args.loaderData;
  return <Register {...loaderData} />;
}

export function meta() {
  return [
    {
      title: 'Register - MyApp',
    },
  ];
}
