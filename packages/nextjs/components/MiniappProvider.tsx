"use client";

import { ReactNode, useEffect } from "react";
import { sdk } from "@farcaster/miniapp-sdk";

export function MiniappProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    sdk.actions.ready();
  }, []);
  return children;
}
