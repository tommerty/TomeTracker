import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SideNav } from "@/components/layout/sidenav";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import MobileNav from "@/components/MobileBottom";

const montserrat = Montserrat({ subsets: ["latin"], display: "swap" });
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});
export const metadata: Metadata = {
    title: "Tome Tracker",
    description: "Tommerty's time tracker",
};

async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = await cookies();
    const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={montserrat.className}
        >
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
                    "min-h-screen bg-background font-sans antialiased dark mx-auto"
                )}
            >
                <SidebarProvider defaultOpen={defaultOpen}>
                    <AppSidebar />
                    <SidebarInset className="relative w-full h-dvh pt-2 max-h-full overflow-hidden space-y-3">
                        {children}
                        <MobileNav />
                    </SidebarInset>
                </SidebarProvider>
            </body>
        </html>
    );
}
export default RootLayout;
