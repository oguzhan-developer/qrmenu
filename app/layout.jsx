import "@/public/globals.css";
import clsx from "clsx";
import { Providers } from "./providers";
import { fontRoboto, settings } from "@/config/settings";

import { SpeedInsights } from "@vercel/speed-insights/next"
export const metadata = {
  title: settings.title,
  description: settings.description,
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
          <SpeedInsights/>
            <main className="container mx-auto max-w-7xl flex-grow flex flex-col items-center">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
