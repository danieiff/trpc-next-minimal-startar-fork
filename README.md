# Next.js + TRPC

This example shows how you can make a typed query using a minimal implementation of TRPC following [`this as a reference`](https://trpc.io/docs/nextjs). 

## Setup

```bash
npx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-minimal-starter trpc-minimal-starter
cd trpc-minimal-starter
npm i
npm run dev
```

## Development

### Start project

```bash
npm run dev        # starts next.js
```

## Recommended Project Structure
```
.
├── prisma  # <-- if prisma is added
│   └── [..]
├── src
│   ├── pages
│   │   ├── _app.tsx  # <-- add `withTRPC()`-HOC here
│   │   ├── api
│   │   │   └── trpc
│   │   │       └── [trpc].ts  # <-- tRPC HTTP handler
│   │   └── [..]
│   ├── server
│   │   ├── routers
│   │   │   ├── _app.ts  # <-- main app router
│   │   │   ├── post.ts  # <-- sub routers
│   │   │   └── [..]
│   │   ├── context.ts   # <-- create app context
│   │   └── trpc.ts      # <-- procedure helpers
│   └── utils
│       └── trpc.ts  # <-- your typesafe tRPC hooks
└── [..]
```

## Other samples
tRPC-SvelteKit - SvelteKit tRPC extension	https://github.com/icflorescu/trpc-sveltekit
tRPC-Remix - Adapter for Remix	https://github.com/ggrandi/trpc-remix
create-t3-app - Scaffold a starter project using the T3 Stack (Next.js, tRPC, Tailwind CSS, Prisma)	https://create.t3.gg
Create tRPC App - Create tRPC-powered apps with one command	https://github.com/omar-dulaimi/create-trpc-app
viteRPC - Monorepo template powered by Vite (Vite, tRPC, Tailwind CSS)	https://github.com/mnik01/viteRPC
tRPC-uWebSockets - Adapter for uWebSockets.js server	https://github.com/romanzy-1612/trpc-uwebsockets
trpc-koa-adapter - tRPC adapter for Koa server	https://github.com/BlairCurrey/trpc-koa-adapter
tRPC - iron-session	https://github.com/parkgang/trpc-iron-session
electron-trpc - Electron support for tRPC	https://github.com/jsonnull/electron-trpc
cloudflare-pages-plugin-trpc - Quickly create a tRPC server with a Cloudflare Pages Function	https://github.com/toyamarinyon/cloudflare-pages-plugin-trpc
ZenStack - Full-stack toolkit adds access control to Prisma and generates trpc routers from schema	https://github.com/zenstackhq/zenstack

tRPC Playground - sandbox for testing tRPC queries in the browser	https://github.com/sachinraja/trpc-playground
tRPC-OpenAPI - OpenAPI & REST support for your tRPC routers	https://github.com/jlalmes/trpc-openapi
tRPC Client Devtools browser extension	https://github.com/rhenriquez28/trpc-client-devtools
tRPC-Chrome - Web extensions messaging support for tRPC	https://github.com/jlalmes/trpc-chrome
Step CI - Automated API Testing and Quality Assurance	https://github.com/stepci/stepci
tRPC panel automatically generates a UI for manually testing your tRPC backend	https://github.com/iway1/trpc-panel
msw-trpc - tRPC support for MSW	https://github.com/maloguertin/msw-trpc

Starter project with Prisma, Next.js, tRPC, E2E-testing	https://github.com/trpc/examples-next-prisma-starter
create-t3-turbo - Clean and simple starter repo using the T3 Stack along with Expo React Native	http://github.com/t3-oss/create-t3-turbo
create-t3-app - Scaffold a starter project using the T3 Stack (Next.js, tRPC, Tailwind CSS, Prisma)	https://create.t3.gg
WebSockets Starter Project	https://github.com/trpc/examples-next-prisma-starter-websockets
tRPC Kitchen Sink - A collection of tRPC usage patterns.	https://github.com/trpc/examples-kitchen-sink
Turborepo + Expo + tRPC Starter	https://github.com/gunnnnii/turbo-expo-trpc-starter
tRPC-SvelteKit Example Application	https://github.com/icflorescu/trpc-sveltekit-example
tRPC + Ultra	https://github.com/sachinraja/trpc-ultra
Nx Monorepo + tRPC + Prisma	https://github.com/nowlena/nx-trpc-test
tRPC (w/ Fetch Adapter) + SvelteKit + Tailwind CSS	https://github.com/austins/trpc-sveltekit-fetchadapter-example
Sign-In With Ethereum tRPC + ViteJS React	https://github.com/codingwithmanny/trpc-siwe-monorepo
Twitter clone - A simple Twitter clone built with T3 Stack + NextAuth + Supabase + Prisma	https://github.com/AlandSleman/t3-twitter-clone

`git clone git@github.com:t3-oss/create-t3-turbo.git` https://github.com/t3-oss/create-t3-turbo
`npx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-websockets-starter trpc-prisma-websockets-starter` https://github.com/trpc/examples-next-prisma-websockets-starter
`npx create-next-app --example https://github.com/trpc/trpc --example-path examples/next-prisma-todomvc trpc-todo` https://github.com/trpc/examples-next-prisma-todomvc

https://github.com/trpc/trpc/tree/main/examples/minimal
https://github.com/trpc/trpc/tree/main/examples/standalone-server
https://github.com/trpc/trpc/tree/main/examples/express-server
https://github.com/trpc/trpc/tree/main/examples/fastify-server


---

## Router
- tRPC custom initialization `const t = initTRPC.context<Context>().meta<Meta>().create({ /* ... */ })`
request context, metadata, format&handle errors, transform data, Customize the runtime configuration (see below)
```ts
export interface RuntimeConfig<TTypes extends RootConfigTypes> {
  /**
   * Use a data transformer
   * @link https://trpc.io/docs/data-transformers
   */
  transformer: TTypes['transformer'];
  /**
   * Use custom error formatting
   * @link https://trpc.io/docs/error-formatting
   */
  errorFormatter: ErrorFormatter<TTypes['ctx'], any>;
  /**
   * Allow `@trpc/server` to run in non-server environments
   * @warning **Use with caution**, this should likely mainly be used within testing.
   * @default false
   */
  allowOutsideOfServer: boolean;
  /**
   * Is this a server environment?
   * @warning **Use with caution**, this should likely mainly be used within testing.
   * @default typeof window === 'undefined' || 'Deno' in window || process.env.NODE_ENV === 'test'
   */
  isServer: boolean;
  /**
   * Is this development?
   * Will be used to decide if the API should return stack traces
   * @default process.env.NODE_ENV !== 'production'
   */
  isDev: boolean;
}
```
- Merge
```ts
// (routers/_app.ts)
 
import { userRouter } from './user';
import { postRouter } from './post';
 
const appRouter = t.router({
  post: postRouter, // put procedures under "post" namespace
  // ...
});
// or const appRouter = t.mergeRouters(userRouter, postRouter)

export type AppRouter = typeof appRouter;
 
// (routers/post.ts) export const postRouter = router({ //
```


## Procedures

- Input Validation
https://github.com/colinhacks/zod
https://github.com/jquense/yup
https://github.com/ianstormtaylor/superstruct
https://github.com/paritytech/scale-ts

- Reusable procedure
```roomProcedure.ts
// ...
export const roomProcedure = publicProcedure.input( z.object({ roomId: z.string() }))
```

## Context
Put database connections or authentication information
```ts
// -------------------------------------------------
// @filename: context.ts
// -------------------------------------------------
 
import { inferAsyncReturnType } from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getSession } from 'next-auth/react';
 
/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getSession({ req: opts.req });
 
  return {
    session,
  };
};
 
export type Context = inferAsyncReturnType<typeof createContext>;
 
// -------------------------------------------------
// @filename: trpc.ts
// -------------------------------------------------
import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context';
 
const t = initTRPC.context<Context>().create();
 
/**
 * Reusable middleware that checks if users are authenticated.
 **/
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.session?.user?.email) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: ctx.session,
    },
  });
});
 
export const middleware = t.middleware;
export const router = t.router;
 
/**
 * Unprotected procedure
 **/
export const publicProcedure = t.procedure;
 
/**
 * Protected procedure
 **/
export const protectedProcedure = t.procedure.use(isAuthed);
 
// -------------------------------------------------
// @filename: _app.ts
// -------------------------------------------------
import { protectedProcedure, publicProcedure, router } from './trpc';
import { z } from 'zod';
 
export const appRouter = router({
  createPost: protectedProcedure
    .mutation(({ ctx }) => {
      const session = ctx.session;
      // [...]
    }),
  whoami: publicProcedure
    .query(({ ctx }) => {
      const session = ctx.session;
      // [...]
    }),
});
```

```ts
// 1. HTTP request
import { createHTTPHandler } from '@trpc/server/adapters/standalone';
import { createContext } from './context';
import { appRouter } from './router';
const handler = createHTTPHandler({
  router: appRouter,
  createContext,
});

// 2. Server-side call
import { createContext } from './context';
import { appRouter } from './router';
const caller = appRouter.createCaller(await createContext());

// 3. servers-side helpers
import { createServerSideHelpers } from '@trpc/react-query/server';
import { createContext } from './context';
import { appRouter } from './router';
const helpers = createServerSideHelpers({
  router: appRouter,
  ctx: await createContext(),
});
```

- Inner, Outer Context
```ts
import type { inferAsyncReturnType } from '@trpc/server';
import type { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getSessionFromCookie, type Session } from './auth';

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions extends Partial<CreateNextContextOptions> {
  session: Session | null;
}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock Next.js' `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    prisma,
    session: opts.session,
  };
}

/**
 * Outer context. Used in the routers and will e.g. bring `req` & `res` to the context as "not `undefined`".
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContext(opts: CreateNextContextOptions) {
  const session = getSessionFromCookie(opts.req);

  const contextInner = await createContextInner({ session });

  return {
    ...contextInner,
    req: opts.req,
    res: opts.res,
  };
}

export type Context = inferAsyncReturnType<typeof createContextInner>; // Infer Context from the inner context (things are always available in inner context).

// The usage in your router is the same as the example above.
```

If you don't want to check req or res for undefined in your procedures all the time, define reusable procedure.
```ts
export const apiProcedure = publicProcedure.use((opts) => {
  if (!opts.ctx.req || !opts.ctx.res) {
    throw new Error('You are missing `req` or `res` in your call.');
  }
  return opts.next({
    ctx: {
      // We overwrite the context with the truthy `req` & `res`, which will also overwrite the types used in your procedure.
      req: opts.ctx.req,
      res: opts.ctx.res,
    },
  });
});
```


## Middleware
TODO
