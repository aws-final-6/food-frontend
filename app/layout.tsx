import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { UIProvider } from "@/providers/uiprovider";
import { siteConfig } from "@/config/site";
import { fontSans, fontJua, fontGaegu } from "@/config/fonts";

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
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://github.com/awscloudschool4"
                title="AWS Cloud School 4기 Github"
              >
                <span className="text-default-600">Created by</span>
                <p className="text-primary">AWS Cloud School 4기 6조</p>
              </Link>
            </footer>
          </div>
        </UIProvider>
      </body>
    </html>
  );
}
