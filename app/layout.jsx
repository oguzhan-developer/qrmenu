import "@/styles/globals.css";
import clsx from "clsx";
import { Providers } from "./providers";

import { fontRoboto, settings } from "@/config/settings";
import TopNavbar from "@/components/TopNavbar/TopNavbar";

export const metadata = {
  title: settings.title,
  description: settings.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}) {


  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontRoboto.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl flex-grow">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
