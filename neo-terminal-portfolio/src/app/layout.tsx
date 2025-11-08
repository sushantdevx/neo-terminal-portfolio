import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Neo-Terminal Portfolio",
  description: "Developer-focused portfolio with terminal aesthetics",
  keywords: ["portfolio", "developer", "terminal", "neo-terminal"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "Neo-Terminal Portfolio",
    description: "Developer-focused portfolio with terminal aesthetics",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neo-Terminal Portfolio",
    description: "Developer-focused portfolio with terminal aesthetics",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="font-mono custom-scrollbar">
        {children}
      </body>
    </html>
  );
}
