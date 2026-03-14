import { initTRPC, TRPCError } from "@trpc/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const createTRPCContext = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return { session };
};

const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create({});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: { session: ctx.session },
  });
});

