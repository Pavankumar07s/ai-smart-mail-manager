"use server";

import { auth } from "@clerk/nextjs/server";

export const getAurinkoAuthUrl = async (
  serviceType: "Google" | "Office365"
): Promise<string> => {
  // Ensure that the user is authenticated
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  // Destructure environment variables and throw errors if any are missing
  const { AURINKO_CLIENT_ID, NEXT_PUBLIC_URL } = process.env;
  if (!AURINKO_CLIENT_ID) {
    throw new Error("Missing AURINKO_CLIENT_ID in environment variables");
  }
  if (!NEXT_PUBLIC_URL) {
    throw new Error("Missing NEXT_PUBLIC_URL in environment variables");
  }

  // Define scopes and other OAuth parameters
  const scopes = "Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All";
  const params = new URLSearchParams({
    clientId: AURINKO_CLIENT_ID,
    serviceType,
    scopes,
    responseType: "code",
    returnUrl: `${NEXT_PUBLIC_URL}/api/aurinko/callback`,
  });

  // Generate and return the authorization URL
  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};
