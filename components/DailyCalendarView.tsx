"use client";
import React, { useEffect, useState } from "react";
import { TimeEntry } from "@/types/TimeEntry";
import { format, differenceInMinutes } from "date-fns";

interface DailyCalendarViewProps {
    timeEntries: TimeEntry[];
    selectedDate: Date;
}

type Category = {
    name: string;
    color: string;
};

const DailyCalendarView: React.FC<DailyCalendarViewProps> = ({
    timeEntries,
    selectedDate,
}) => {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const savedCategories = localStorage.getItem("timeTrackerCategories");
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);

    const getCategoryColor = (categoryName: string) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.color : "#000000";
    };

    const filteredEntries = timeEntries.filter(
        (entry) =>
            format(new Date(entry.date), "yyyy-MM-dd") ===
            format(selectedDate, "yyyy-MM-dd")
    );

    const renderTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            slots.push(
                <div key={hour} className="flex border-t">
                    <div className="w-16 text-right pr-2 py-2">{`${hour
                        .toString()
                        .padStart(2, "0")}:00`}</div>
                    <div className="flex-grow relative h-16"></div>
                </div>
            );
        }
        return slots;
    };

    const renderEntries = () => {
        const sortedEntries = [...filteredEntries].sort(
            (a, b) =>
                new Date(a.startTime).getTime() -
                new Date(b.startTime).getTime()
        );

        const columns: TimeEntry[][] = [];

        sortedEntries.forEach((entry) => {
            const column = columns.find(
                (col) =>
                    !col.some(
                        (existingEntry) =>
                            new Date(entry.startTime) <
                                new Date(existingEntry.endTime) &&
                            new Date(entry.endTime) >
                                new Date(existingEntry.startTime)
                    )
            );

            if (column) {
                column.push(entry);
            } else {
                columns.push([entry]);
            }
        });

        return columns.flatMap((column, columnIndex) =>
            column.map((entry) => {
                const start = new Date(entry.startTime);
                const end = new Date(entry.endTime);
                const top =
                    (start.getHours() * 60 + start.getMinutes()) * (16 / 15);
                const height = differenceInMinutes(end, start) * (16 / 15);
                const width = (100 - 20) / columns.length; // Adjust for the time labels

                return (
                    <div
                        key={entry.id}
                        className="absolute overflow-hidden text-lg font-bold rounded px-1"
                        style={{
                            top: `${top}px`,
                            height: `${height}px`,
                            left: `calc(20% + ${columnIndex * width}%)`,
                            width: `${width}%`,
                            backgroundColor: getCategoryColor(entry.category),
                        }}
                    >
                        {entry.category}
                    </div>
                );
            })
        );
    };

    return (
        <div className="daily-calendar flex flex-col overflow-auto h-full p-3">
            <div className="flex-grow relative">
                {renderTimeSlots()}
                {renderEntries()}
            </div>
        </div>
    );
};

export default DailyCalendarView;
