import "./globals.css";
import "reactflow/dist/style.css";
import type { Metadata } from "next";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Infinity — describe it, and it builds",
  description: "AI builds your automations live. n8n inside, Lovable on the outside.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-bg text-text font-sans antialiased selection:bg-primary/15">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
