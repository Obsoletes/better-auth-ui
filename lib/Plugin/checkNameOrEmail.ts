import { type BetterAuthPlugin } from "better-auth";
import { Prisma } from "@/lib/Prisma";
import { z } from "zod";
import { createEndpoint } from "better-call";
const query = z
  .object({
    nameOrEmail: z.string(),
  })
  .optional();
const checkEmail = async (email: string) => {
  return (
    (await Prisma.user.count({
      where: {
        email: email,
      },
    })) === 1
  );
};
const checkUserName = async (username: string) => {
  return (
    (await Prisma.user.count({
      where: { username },
    })) === 1
  );
};
export const checkNameOrEmail = () => {
  return {
    id: "check-name-email",
    endpoints: {
      check: createEndpoint(
        "/check/checknameemail",
        { method: "GET", query },
        async (context) => {
          const { nameOrEmail } = context.query ?? { nameOrEmail: "" };
          if (nameOrEmail.includes("@")) {
            const exists = await checkEmail(nameOrEmail);
            return { exists };
          } else {
            const exists = await checkUserName(nameOrEmail);
            return { exists };
          }
        }
      ),
    },
  } satisfies BetterAuthPlugin;
};
