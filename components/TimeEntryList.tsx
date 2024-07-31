"use client";
import React, { useEffect, useState } from "react";
import { format, compareAsc } from "date-fns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { TimeEntry } from "@/types/TimeEntry";
import { Skeleton } from "./ui/skeleton";

type Category = {
    name: string;
    color: string;
};

interface TimeEntryListProps {
    selectedDate: Date;
    timeEntries: TimeEntry[];
    onDeleteTimeEntry: (entryId: string) => void;
    isLoading: boolean;
}

const TimeEntryList: React.FC<TimeEntryListProps> = ({
    selectedDate,
    timeEntries,
    onDeleteTimeEntry,
    isLoading: initialIsLoading,
}) => {
    const [isLoading, setIsLoading] = useState(initialIsLoading);

    useEffect(() => {
        setIsLoading(initialIsLoading);
    }, [initialIsLoading]);
    const filteredEntries = timeEntries.filter(
        (entry) =>
            new Date(entry.date).toDateString() === selectedDate.toDateString()
    );

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const savedCategories = localStorage.getItem("timeTrackerCategories");
        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }
    }, []);
    const getCategoryColor = (categoryName: string) => {
        const category = categories.find((cat) => cat.name === categoryName);
        return category ? category.color : "#000000"; // Default color if not found
    };

    return (
        <div>
            {isLoading ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {[...Array(3)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-20" />
                                </TableCell>
                                <TableCell>
                                    <Skeleton className="h-4 w-24" />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Skeleton className="h-8 w-16" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : filteredEntries.length === 0 ? (
                <p>No time entries for the selected date.</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Start</TableHead>
                            <TableHead>End</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredEntries.map((entry) => (
                            <TableRow key={entry.id}>
                                <TableCell>
                                    {format(
                                        new Date(entry.startTime),
                                        "h:mm a"
                                    )}
                                </TableCell>
                                <TableCell>
                                    {format(new Date(entry.endTime), "h:mm a")}
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center">
                                        <div
                                            className="w-4 h-4 rounded-full mr-2"
                                            style={{
                                                backgroundColor:
                                                    getCategoryColor(
                                                        entry.category
                                                    ),
                                            }}
                                        />
                                        {entry.category}
                                    </div>
                                </TableCell>

                                <TableCell className="text-right">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="ml-2"
                                        onClick={() =>
                                            onDeleteTimeEntry(entry.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}
        </div>
    );
};

export default TimeEntryList;
