import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { UIProvider } from "@/providers/uiProvider";
import { UserProvider } from "@/providers/userProvider";
import { siteConfig } from "@/config/site";
import { fontSans, fontJua, fontGaegu } from "@/config/fonts";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background antialiased",
          fontSans.variable,
          fontJua.variable,
          fontGaegu.variable
        )}
      >
        <UIProvider themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <UserProvider>
            <div className="relative flex flex-col h-screen ">
              <Navbar />
              <div className="bg-[#FFF6F3]">
                <main className="container mx-auto max-w-7xl py-16 px-6 flex-grow bg-[#FEFEFC]">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
          </UserProvider>
        </UIProvider>
      </body>
    </html>
  );
}
