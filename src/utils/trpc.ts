/*import { createReactQueryHooks } from '@trpc/react';
import type { AppRouter } from '../pages/api/trpc/[trpc]';

export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}
*/
import { createTRPCNext } from '@trpc/next';
import { AppRouter } from '../pages/api/trpc/[trpc]';

export const trpc = createTRPCNext<AppRouter>({
  config(/* { ctx } */) { // ctx has Next.js's `req` and `res` properties
    return {
      url: '/api/trpc',
      // links: tRPC's 'links' (only required among others optional)
      // queryClientConfig: a config obj for react-query, or queryClient: a react-query queryClient instance, either
      // transformer: a function that transforms the response before returned to client
      // abortOnUnmount: abort request on unmount (default: false)
    };
  },
  // unstable_overrides: (default: false) https://trpc.io/docs/reactjs/usecontext#invalidate-full-cache-on-every-mutation
  // ssr: (default: false) Whether tRPC should await queries when SSR
  // responseMeta() {} Ability to set request headers and HTTP status when SSR
});



// Official doc says:
// 
// import { httpBatchLink } from '@trpc/client';
// import { createTRPCNext } from '@trpc/next';
// import type { AppRouter } from '../server/routers/_app';
// 
// function getBaseUrl() {
//   if (typeof window !== 'undefined')
//     // browser should use relative path
//     return '';
// 
//   if (process.env.VERCEL_URL)
//     // reference for vercel.com
//     return `https://${process.env.VERCEL_URL}`;
// 
//   if (process.env.RENDER_INTERNAL_HOSTNAME)
//     // reference for render.com
//     return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`;
// 
//   // assume localhost
//   return `http://localhost:${process.env.PORT ?? 3000}`;
// }
// 
// export const trpc = createTRPCNext<AppRouter>({
//   config({ ctx }) {
//     return {
//       links: [
//         httpBatchLink({
//           /**
//            * If you want to use SSR, you need to use the server's full URL
//            * @link https://trpc.io/docs/ssr
//            **/
//           url: `${getBaseUrl()}/api/trpc`,
// 
//           // You can pass any HTTP headers you wish here
//           async headers() {
//             return {
//               // authorization: getAuthCookie(),
//             };
//           },
//         }),
//       ],
//     };
//   },
//   /**
//    * @link https://trpc.io/docs/ssr
//    **/
//   ssr: false,
// });
