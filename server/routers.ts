import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { portfolio } from "../shared/portfolio";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { notifyOwner } from "./_core/notification";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";

const contactInput = z.object({
  name: z.string().trim().min(2, "Please enter a name with at least two characters.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(320),
  message: z.string().trim().min(10, "Please enter a message with at least ten characters.").max(2000),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),
  portfolio: router({
    get: publicProcedure.query(() => portfolio),
  }),
  contact: router({
    submit: publicProcedure.input(contactInput).mutation(async ({ input }) => {
      try {
        const notificationSent = await notifyOwner({
          title: "New portfolio contact message",
          content: `From: ${input.name}\nEmail: ${input.email}\n\n${input.message}`,
        });
        if (!notificationSent) {
          throw new Error("Owner notification service did not confirm delivery");
        }
        return { success: true } as const;
      } catch (error) {
        console.error("[Contact] Owner notification failed", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to send the message at this time. Please try again shortly.",
        });
      }
    }),
  }),
});

export type AppRouter = typeof appRouter;
