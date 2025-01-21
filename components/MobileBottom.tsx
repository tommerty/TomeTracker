"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { mainItems, footerItems } from "@/lib/navigation";
import { usePathname, useRouter } from "next/navigation";

export default function MobileNav() {
    const router = useRouter();
    const path = usePathname();
    return (
        <div className="md:hidden bottom-0 bg-card border-t-2 w-full flex items-center justify-between gap-2 p-2">
            <div className="flex items-center gap-3">
                {mainItems.map((item) => (
                    <Button
                        key={item.title}
                        variant={"mobile_active"}
                        size={"mobile"}
                    >
                        <item.icon size={30} className=" !text-current" />
                    </Button>
                ))}
            </div>
        </div>
    );
}
