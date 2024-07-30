"use client";
import React, { useState } from "react";
import {
    format,
    startOfDay,
    addMinutes,
    setHours,
    setMinutes,
    addHours,
} from "date-fns";
import { Label } from "./ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { TimeEntry } from "@/types/TimeEntry";
import CategoryManager from "./CategoryManager";
import { Plus } from "lucide-react";

interface TimeTrackerProps {
    selectedDate: Date;
    onAddTimeEntry: (entry: TimeEntry) => void;
    onClose: () => void;
}

const getLatestEndTime = (selectedDate: Date) => {
    const timeEntries = JSON.parse(localStorage.getItem("timeEntries") || "[]");
    if (timeEntries.length > 0) {
        const latestEntry = timeEntries[timeEntries.length - 1];
        return new Date(latestEntry.endTime);
    } else {
        return setHours(setMinutes(startOfDay(selectedDate), 0), 7);
    }
};
const TimeTracker: React.FC<TimeTrackerProps> = ({
    selectedDate,
    onAddTimeEntry,
    onClose,
}) => {
    const [startTime, setStartTime] = useState(getLatestEndTime(selectedDate));
    const [endTime, setEndTime] = useState(() => addHours(startTime, 1));

    const [selectedCategory, setSelectedCategory] = useState("");

    const handleStartTimeChange = (value: string) => {
        const selectedTime = new Date(value);
        setStartTime(selectedTime);
    };

    const handleEndTimeChange = (value: string) => {
        const selectedTime = new Date(value);
        setEndTime(selectedTime);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleSaveTimeEntry = () => {
        const newTimeEntry: TimeEntry = {
            id: Date.now().toString(),
            date: selectedDate,
            startTime,
            endTime,
            category: selectedCategory,
        };
        onAddTimeEntry(newTimeEntry);
        onClose();
        setStartTime(endTime);
        setEndTime(setHours(setMinutes(startOfDay(selectedDate), 0), 7));
        setSelectedCategory("");
    };

    const generateTimeOptions = () => {
        const options = [];
        let currentTime = startOfDay(selectedDate);

        while (currentTime < addMinutes(startOfDay(selectedDate), 1440)) {
            options.push(
                <SelectItem
                    key={currentTime.getTime()}
                    value={currentTime.toISOString()}
                >
                    {format(currentTime, "HH:mm")}
                </SelectItem>
            );
            currentTime = addMinutes(currentTime, 15);
        }

        return options;
    };
    return (
        <div>
            <div className="flex gap-2 justify-start">
                <div className="w-full">
                    <Label htmlFor="startTime">Start</Label>
                    <Select
                        onValueChange={handleStartTimeChange}
                        defaultValue={startTime.toISOString()}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select start time" />
                        </SelectTrigger>
                        <SelectContent>{generateTimeOptions()}</SelectContent>
                    </Select>
                </div>
                <div className="w-full">
                    <Label htmlFor="endTime">End</Label>
                    <Select
                        onValueChange={handleEndTimeChange}
                        defaultValue={endTime.toISOString()}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select end time" />
                        </SelectTrigger>
                        <SelectContent>{generateTimeOptions()}</SelectContent>
                    </Select>
                </div>
            </div>
            <CategoryManager onCategoryChange={handleCategoryChange} />
            <div className="mt-4">
                <Button onClick={handleSaveTimeEntry}>
                    <Plus />
                </Button>
            </div>
        </div>
    );
};

export default TimeTracker;
