"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import * as Icons from "@tabler/icons-react";

import { motion } from "framer-motion";
interface Props {
    children: React.ReactNode;
}
export const SideNav = ({ children }: Props) => {
    return (
        <div className="flex bg-background">
            <Sidebar />
            <div className="w-full">{children}</div>
        </div>
    );
};

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [selected, setSelected] = useState("Dashboard");

    return (
        <motion.nav
            layout
            className="sticky top-0 h-screen shrink-0 border-r bg-background p-2 z-[999]"
            style={{
                width: open ? "225px" : "fit-content",
            }}
        >
            <TitleSection open={open} />

            <div className="space-y-1">
                <Option
                    Icon={Icons.IconClock}
                    title="Time Tracking"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
                <Option
                    Icon={Icons.IconListCheck}
                    title="Todo"
                    selected={selected}
                    setSelected={setSelected}
                    open={open}
                />
            </div>

            <ToggleClose open={open} setOpen={setOpen} />
        </motion.nav>
    );
};

const Option = ({
    Icon,
    title,
    selected,
    setSelected,
    open,
}: {
    Icon: any;
    title: string;
    selected: string;
    setSelected: Dispatch<SetStateAction<string>>;
    open: boolean;
}) => {
    return (
        <motion.button
            layout
            onClick={() => setSelected(title)}
            className={`relative flex h-10 w-full items-center rounded-md transition-colors ${
                selected === title
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
        </motion.button>
    );
};

const TitleSection = ({ open }: { open: boolean }) => {
    return (
        <div className="mb-3 border-b pb-3">
            <div className="flex items-center justify-between rounded-md">
                <div className="flex items-center gap-2">
                    <Logo />
                    {open && (
                        <motion.div
                            layout
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.125 }}
                        >
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
            className="absolute bottom-0 left-0 right-0 border-t transition-colors hover:bg-accent"
        >
            <div className="flex items-center p-2">
                <motion.div
                    layout
                    className="grid size-10 place-content-center text-lg"
                >
                    <Icons.IconChevronRight
                        className={`transition-transform ${
                            open && "rotate-180"
                        }`}
                    />
                </motion.div>
                {open && (
                    <motion.span
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.125 }}
                        className="text-xs font-medium"
                    >
                        Hide
                    </motion.span>
                )}
            </div>
        </motion.button>
    );
};
