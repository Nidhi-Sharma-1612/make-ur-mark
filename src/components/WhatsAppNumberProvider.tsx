"use client";

import { createContext, useContext } from "react";

const WhatsAppNumberContext = createContext<string>("91XXXXXXXXXX");

export function WhatsAppNumberProvider({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return <WhatsAppNumberContext.Provider value={number}>{children}</WhatsAppNumberContext.Provider>;
}

export function useWhatsAppNumber(): string {
  return useContext(WhatsAppNumberContext);
}
