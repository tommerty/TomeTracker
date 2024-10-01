"use client";

import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import * as Icons from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";

interface Props {
    children: React.ReactNode;
}

export const SideNav = ({ children }: Props) => {
    return (
        <div className="flex bg-background">
            <Sidebar />
            <div className="w-full h-dvh p-2">{children}</div>
        </div>
    );
};

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const pathname = usePathname();
    const [selected, setSelected] = useState(pathname);

    useEffect(() => {
        setSelected(pathname);
    }, [pathname]);

    return (
        <motion.nav
            layout
            className="sticky top-0 h-dvh flex flex-col gap-2 max-h-full shrink-0 border-r bg-background p-2 z-[999]"
            style={{
                width: open ? "225px" : "fit-content",
            }}
        >
            <div className="flex items-center justify-between border-b pb-3">
                <TitleSection open={open} />
                <ToggleClose open={open} setOpen={setOpen} />
            </div>

            <div className="flex flex-col gap-2">
                <Option
                    Icon={Icons.IconClock}
                    title="Time Tracking"
                    route="/dashboard"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={Icons.IconListCheck}
                    title="Todo"
                    route="/todo"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
            </div>
            <div className="flex flex-col gap-2 mt-auto">
                <Separator />
                <Option
                    Icon={Icons.IconBrandGithub}
                    title="GitHub"
                    route="https://github.com/tommerty/TomeTracker"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                    external
                />
            </div>
        </motion.nav>
    );
};

const Option = ({
    Icon,
    title,
    route,
    selected,
    setSelected,
    open,
    external,
}: {
    Icon: any;
    title: string;
    route: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
    open: boolean;
    external?: boolean;
}) => {
    const handleClick = () => {
        setSelected(route);
    };

    const linkProps = external
        ? { href: route, target: "_blank", rel: "noopener noreferrer" }
        : { href: route };

    return (
        <Link {...linkProps}>
            <motion.a
                layout
                onClick={handleClick}
                className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                    selected === route
                        ? "bg-accent text-foreground"
                        : "text-foreground/50 hover:bg-accent hover:text-foreground"
                }`}
            >
                <motion.div
                    layout
                    className="grid h-full w-10 place-content-center text-lg"
                >
                    <Icon />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        {title}
                    </motion.span>
                )}
            </motion.a>
        </Link>
    );
};

const TitleSection = ({ open }: { open: boolean }) => {
    return (
        <div className="">
            <div className="flex items-center justify-between rounded-md">
                <div className="flex items-center gap-2">
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                            className="flex items-center gap-2"
                        >
                            <Logo />
                            <span className="block text-sm font-bold">
                                Tome Tracker
                            </span>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    );
};

const Logo = () => {
    // Temp logo from https://logoipsum.com/
    return (
        <motion.div
            layout
            className="grid size-10 shrink-0 place-content-center rounded-md"
        >
            <img src="/icons/icon-192x192.png" className="rounded-md" />
        </motion.div>
    );
};

const ToggleClose = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
    return (
        <motion.button
            layout
            onClick={() => setOpen((pv) => !pv)}
            className=" transition-colors hover:bg-accent"
        >
            <div className="flex items-center p-2">
                <Icons.IconChevronRight
                    className={`transition-transform ${open && "rotate-180"}`}
                />
            </div>
        </motion.button>
    );
};
