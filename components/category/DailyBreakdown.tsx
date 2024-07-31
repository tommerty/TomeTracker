"use client";
import React, { useState, useEffect } from "react";
import { TimeEntry } from "@/types/TimeEntry";
import { differenceInMinutes } from "date-fns";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "../ui/badge";
import { Check, X } from "lucide-react";
import { Category } from "@/types/Category";

interface DailyBreakdownProps {
    selectedDate: Date;
    timeEntries: TimeEntry[];
    categoryColor?: string;
}

interface CategoryBreakdown {
    category: string;
    duration: number;
    enabled: boolean;
}

const DailyBreakdown: React.FC<DailyBreakdownProps> = ({
    selectedDate,
    timeEntries,
    categoryColor,
}) => {
    const [categoryBreakdowns, setCategoryBreakdowns] = useState<
        CategoryBreakdown[]
    >([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const filteredEntries = timeEntries.filter(
            (entry) =>
                new Date(entry.date).toDateString() ===
                selectedDate.toDateString()
        );

        const breakdowns = filteredEntries.reduce((acc, entry) => {
            const duration =
                differenceInMinutes(
                    new Date(entry.endTime),
                    new Date(entry.startTime)
                ) / 60;
            const existingCategory = acc.find(
                (item) => item.category === entry.category
            );

            if (existingCategory) {
                existingCategory.duration += duration;
            } else {
                acc.push({ category: entry.category, duration, enabled: true });
            }

            return acc;
        }, [] as CategoryBreakdown[]);

        setCategoryBreakdowns(breakdowns);
    }, [selectedDate, timeEntries]);

    useEffect(() => {
        const newTotal = categoryBreakdowns
            .filter((breakdown) => breakdown.enabled)
            .reduce((sum, breakdown) => sum + breakdown.duration, 0);
        setTotal(newTotal);
    }, [categoryBreakdowns]);

    const toggleCategory = (category: string) => {
        setCategoryBreakdowns((prevBreakdowns) =>
            prevBreakdowns.map((breakdown) =>
                breakdown.category === category
                    ? { ...breakdown, enabled: !breakdown.enabled }
                    : breakdown
            )
        );
    };
    const getCategoryColor = (categoryName: string): string => {
        const savedCategories = localStorage.getItem("timeTrackerCategories");
        if (savedCategories) {
            const categories = JSON.parse(savedCategories);
            const category = categories.find(
                (cat: { name: string; color: string }) =>
                    cat.name === categoryName
            );
            return category ? category.color : "#000000"; // Default color if not found
        }
        return "#000000"; // Default color if no categories are saved
    };

    return (
        <div className="p-4 bg-card rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Daily Breakdown</h2>
            {categoryBreakdowns.map(({ category, duration, enabled }) => (
                <div
                    key={category}
                    className="flex items-center justify-between mb-2"
                >
                    <div className="flex items-center gap-2">
                        <Toggle
                            pressed={enabled}
                            onPressedChange={() => toggleCategory(category)}
                            aria-label={`Toggle ${category}`}
                            className={`shrink-0 px-6`}
                            style={{
                                backgroundColor: enabled
                                    ? getCategoryColor(category)
                                    : "transparent",
                            }}
                        >
                            {category}
                        </Toggle>
                    </div>
                    <span>{duration.toFixed(1)} hours</span>
                </div>
            ))}
            <div className="mt-4 pt-2 border-t">
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(1)} hours</span>
                </div>
            </div>
        </div>
    );
};

export default DailyBreakdown;
