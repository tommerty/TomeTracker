import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SideNav } from "@/components/layout/sidenav";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Tome Tracker",
    description: "Tommerty's time tracker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <link rel="manifest" href="/manifest.json" />
            <link
                rel="icon"
                href="/icons/icon-192x192.png"
                type="image/png"
                sizes="192x192"
            />
            <body
                suppressHydrationWarning
                className={cn(
                    "min-h-screen bg-background font-sans antialiased dark max-w-screen-2xl mx-auto",
                    montserrat.variable
                )}
            >
                <SideNav>{children}</SideNav>
            </body>
        </html>
    );
}
