import { Inter } from "next/font/google";
import Analytics from "./_components/gtm/gtm";
import { Suspense } from "react";
import { headers } from "next/headers";
import { getMetadata } from "@/config/metadata";

import "./globals.css";

export const metadata = getMetadata();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const nonce = headers().get("X-Nonce");

  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Suspense>
          <Analytics nonce={nonce} />
        </Suspense>
      </body>
    </html>
  );
}
