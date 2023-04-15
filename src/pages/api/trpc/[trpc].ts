import { initTRPC } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";

export interface User {
  id: string;
  name: string;
}

const userList: User[] = [
  {
    id: "1",
    name: "KATT",
  },
];

const t = initTRPC.create();
const publicProcedure = t.procedure;

export const appRouter = t.router({
  userById: publicProcedure
    .input((val: unknown) => {
      if (typeof val === "string") return val;
      throw new Error(`Invalid input: ${typeof val}`);
    })
    .query((req) => {
      const { input } = req;
      const user = userList.find((it) => it.id === input);
      return user;
    }),
  userCreate: publicProcedure
    .input(z.object({ id: z.string(), name: z.string() }))
    .mutation((req) => {
      const user: User = {
        id: req.input.id,
        name: req.input.name,
      };
      userList.push(user);
      return user;
    }),
  hello: publicProcedure
    // Try changing the input type and see the typeerrors on the client
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting_text: `hello ${input?.text ?? "world"}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
