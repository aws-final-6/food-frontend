"use client";
import { RefrigeratorProvider } from "./provider";
export default function RefrigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RefrigeratorProvider>{children}</RefrigeratorProvider>
    </>
  );
}
