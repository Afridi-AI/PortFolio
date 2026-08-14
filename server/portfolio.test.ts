import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn(),
}));

import { notifyOwner } from "./_core/notification";
import { contactFeedback } from "../shared/contact";
import { appRouter } from "./routers";
import { portfolio } from "../shared/portfolio";
import type { TrpcContext } from "./_core/context";

const mockNotifyOwner = vi.mocked(notifyOwner);

function createContext(): TrpcContext {
  return {
    user: null,
    req: {} as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("portfolio router", () => {
  beforeEach(() => {
    mockNotifyOwner.mockReset();
  });

  it("returns the single CV-grounded portfolio content model", async () => {
    const caller = appRouter.createCaller(createContext());
    await expect(caller.portfolio.get()).resolves.toEqual(portfolio);
  });

  it("validates and forwards a valid contact message to the owner notification channel", async () => {
    mockNotifyOwner.mockResolvedValue(true);
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.contact.submit({
        name: "Amina Khan",
        email: "amina@example.com",
        message: "I would like to discuss an AI internship opportunity with you.",
      }),
    ).resolves.toEqual({ success: true });

    expect(mockNotifyOwner).toHaveBeenCalledWith({
      title: "New portfolio contact message",
      content:
        "From: Amina Khan\nEmail: amina@example.com\n\nI would like to discuss an AI internship opportunity with you.",
    });
    expect(contactFeedback.success).toContain("sent successfully");
  });

  it("returns an internal error when the owner notification channel is unavailable", async () => {
    mockNotifyOwner.mockResolvedValue(false);
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.contact.submit({
        name: "Amina Khan",
        email: "amina@example.com",
        message: "I would like to discuss an AI internship opportunity with you.",
      }),
    ).rejects.toMatchObject({ code: "INTERNAL_SERVER_ERROR" });

    expect(contactFeedback.error).toContain("could not be sent");
  });

  it("rejects an incomplete contact message before sending a notification", async () => {
    const caller = appRouter.createCaller(createContext());

    await expect(
      caller.contact.submit({
        name: "A",
        email: "not-an-email",
        message: "short",
      }),
    ).rejects.toMatchObject({ code: "BAD_REQUEST" });

    expect(mockNotifyOwner).not.toHaveBeenCalled();
  });
});
