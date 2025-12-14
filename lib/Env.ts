import z from 'zod';

const model = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  ApplicationName: z.string().default('Auth'),
  DatabaseUrl: z.string().optional(),
});

const from = {
  NODE_ENV: import.meta.env.NODE_ENV ?? process?.env.NODE_ENV,
  APPLICATION_NAME: import.meta.env.APPLICATION_NAME ?? process?.env.NODE_ENV,
  DATABASE_URL: import.meta.env.DATABASE_URL ?? process?.env.NODE_ENV,
};
export const Env = model.parse({
  NODE_ENV: from.NODE_ENV,
  ApplicationName: from.APPLICATION_NAME,
  DatabaseUrl: from.DATABASE_URL,
});
