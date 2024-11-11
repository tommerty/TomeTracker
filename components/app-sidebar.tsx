"use client";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import * as tabler from "@tabler/icons-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { toast } from "sonner";
import React from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { footerItems, mainItems } from "@/lib/navigation";
interface DropdownItem {
    name?: string;
    icon?: React.ReactNode;
    group: string;
    showGroupTitle?: boolean;
    href?: string;
    noRevalidate?: boolean;
    onClick?: () => void;
    separator?: boolean;
    submenu?: DropdownItem[];
}

interface SidebarNavProps {
    items?: DropdownItem[];
}

export function AppSidebar({ items }: SidebarNavProps) {
    const {
        state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,
    } = useSidebar();

    const path = usePathname();

    return (
        <Sidebar variant="floating" collapsible="icon" className="select-none">
            <SidebarHeader>
                <SidebarMenu>
                    <div
                        className={`flex items-center justify-between ${
                            state === "collapsed"
                                ? "flex-col-reverse"
                                : "flex-row"
                        }`}
                    >
                        <SidebarMenuItem
                            className={cn(state === "collapsed" && "hidden")}
                        >
                            <SidebarMenuButton asChild className=" select-none">
                                <a href={""}>
                                    <img
                                        src="/icons/icon-192x192.png"
                                        alt="Tome Logo"
                                        className={`h-[20px] w-[20px] rounded-full object-contain`}
                                    />
                                    <span className="text-xl font-bold text-foreground">
                                        Tome Tracker
                                    </span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton onClick={toggleSidebar}>
                                <tabler.IconLayoutSidebar />
                                <span className="sr-only">Toggle Sidebar</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </div>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {mainItems.map((item) => (
                                <SidebarMenuItem key={item.url}>
                                    <SidebarMenuButton
                                        tooltip={item.title}
                                        asChild
                                        isActive={path.endsWith(item.url)}
                                    >
                                        <Link
                                            prefetch={false}
                                            href={item.url}
                                            replace
                                        >
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            {/* Content */}
            <SidebarFooter>
                <SidebarMenu>
                    {footerItems.map((item) => (
                        <SidebarMenuItem key={item.url}>
                            <SidebarMenuButton
                                tooltip={item.title}
                                asChild
                                isActive={path.endsWith(item.url)}
                            >
                                <Link prefetch={false} href={item.url} replace>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
