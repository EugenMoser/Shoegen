import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { serverAuthGuard } from '@/modules/auth/serverAuthGuard';
import { Role } from '@/modules/auth/types';

// Mock dependencies
jest.mock("@/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("serverAuthGuard", () => {
  const mockAuth = auth as jest.Mock;
  const mockRedirect = redirect as unknown as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("when user is NOT logged in", () => {
    beforeEach(() => {
      mockAuth.mockResolvedValue(null);
    });

    it("should redirect to /login if isAction is false (default)", async () => {
      await serverAuthGuard();
      expect(mockRedirect).toHaveBeenCalledWith("/login");
    });

    it("should throw 'Nicht authentifiziert' error if isAction is true", async () => {
      await expect(serverAuthGuard(undefined, true)).rejects.toThrow(
        "Nicht authentifiziert. Bitte melden Sie sich an.",
      );
      expect(mockRedirect).not.toHaveBeenCalled();
    });
  });

  describe("when user IS logged in", () => {
    const mockSession = {
      user: {
        id: "1",
        role: "VIEWER" as Role,
      },
    };

    beforeEach(() => {
      mockAuth.mockResolvedValue(mockSession);
    });

    it("should return session if no permissions required", async () => {
      const result = await serverAuthGuard();
      expect(result).toEqual(mockSession);
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    describe("and permission check fails", () => {
      // VIEWER does not have product:delete
      const requiredPermissions = ["product:delete" as any];

      it("should redirect to /unauthorized if isAction is false", async () => {
        await serverAuthGuard(requiredPermissions);
        expect(mockRedirect).toHaveBeenCalledWith("/unauthorized");
      });

      it("should throw 'Zugriff verweigert' error if isAction is true", async () => {
        await expect(
          serverAuthGuard(requiredPermissions, true),
        ).rejects.toThrow("Zugriff verweigert. Fehlende Berechtigungen.");
        expect(mockRedirect).not.toHaveBeenCalled();
      });
    });

    describe("and permission check succeeds", () => {
      // VIEWER has product:read
      const requiredPermissions = ["product:read" as any];

      it("should return session", async () => {
        const result = await serverAuthGuard(requiredPermissions);
        expect(result).toEqual(mockSession);
        expect(mockRedirect).not.toHaveBeenCalled();
      });
    });
  });
});
