import { createTRPCContext } from "@/server/trpc";
import { appRouter } from "@/server/routers";
import { cache } from "react";

const createCaller = appRouter.createCaller;
export const api = cache(async () => {
  const context = await createTRPCContext();
  return createCaller(context);
});
