"use client";
import React, { useState, useEffect } from "react";
import { TimeEntry } from "@/types/TimeEntry";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Label } from "./ui/label";

interface TimeTrackerSummaryProps {
    timeEntries: TimeEntry[];
}

const TimeTrackerSummary: React.FC<TimeTrackerSummaryProps> = ({
    timeEntries,
}) => {
    const categories = Array.from(
        new Set(timeEntries.map((entry) => entry.category))
    );
    const [totalTime, setTotalTime] = useState(0);
    const [selectedCategories, setSelectedCategories] =
        useState<string[]>(categories);

    useEffect(() => {
        const filteredEntries = timeEntries.filter((entry) =>
            selectedCategories.includes(entry.category)
        );
        const total = filteredEntries.reduce((acc, entry) => {
            const start = new Date(entry.startTime).getTime();
            const end = new Date(entry.endTime).getTime();
            const durationInMinutes = (end - start) / (1000 * 60);
            return acc + durationInMinutes;
        }, 0);

        setTotalTime(total);
    }, [timeEntries, selectedCategories]);

    const handleCategoryToggle = (categories: string[]) => {
        setSelectedCategories(categories);
    };

    return (
        <div className="flex items-center gap-1">
            <div>
                <ToggleGroup
                    type="multiple"
                    value={selectedCategories}
                    onValueChange={handleCategoryToggle}
                    defaultValue={categories}
                    className="bg-muted rounded-md p-1"
                >
                    {categories.map((category) => (
                        <ToggleGroupItem key={category} value={category}>
                            {category}
                        </ToggleGroupItem>
                    ))}
                </ToggleGroup>
            </div>
            <Label>Time: {(totalTime / 60).toFixed(2)} hours</Label>
        </div>
    );
};

export default TimeTrackerSummary;
