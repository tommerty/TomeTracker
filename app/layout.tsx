import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
    title: "Tome Time - Dashboard",
    description: "Tommerty's time tracker",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <link rel="manifest" href="/manifest.json" />
            <link
                rel="icon"
                href="/icons/icon-192x192.png"
                type="image/png"
                sizes="192x192"
            />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased dark",
                    montserrat.variable
                )}
            >
                {children}
            </body>
        </html>
    );
}
