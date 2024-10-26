/* eslint-disable @next/next/no-async-client-component */
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getAurinkoAuthUrl } from "@/lib/aurinko";

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleAuthClick = async () => {
    setLoading(true);
    try {
      const authUrl = await getAurinkoAuthUrl("Google");
      window.location.href = authUrl;
    } catch (error) {
      console.error("Failed to get authentication URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={handleAuthClick} disabled={loading}>
        {loading ? "Redirecting..." : "Get Authenticated"}
      </Button>
    </div>
  );
}
