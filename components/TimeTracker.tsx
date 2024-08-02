"use client";
import React, { useState, useEffect } from "react";
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
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

interface TimeTrackerProps {
    selectedDate: Date;
    onAddTimeEntry: (entry: TimeEntry) => void;
    onClose: () => void;
    selectedSlot?: { start: Date; end: Date };
}

const getLatestEndTime = (selectedDate: Date) => {
    const timeEntries = JSON.parse(localStorage.getItem("timeEntries") || "[]");
    if (timeEntries.length > 0) {
        const latestEntry = timeEntries[timeEntries.length - 1];
        return new Date(latestEntry.end);
    } else {
        return setHours(setMinutes(startOfDay(selectedDate), 0), 7);
    }
};

const TimeTracker: React.FC<TimeTrackerProps> = ({
    selectedDate,
    onAddTimeEntry,
    onClose,
    selectedSlot,
}) => {
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState(selectedDate);
    const [endTime, setEndTime] = useState(selectedDate);

    useEffect(() => {
        if (selectedSlot) {
            setStartTime(selectedSlot.start);
            setEndTime(selectedSlot.end);
        } else {
            setStartTime(selectedDate);
            setEndTime(selectedDate);
        }
    }, [selectedDate, selectedSlot]);

    const handleCategoryChange = (newCategory: string) => {
        setCategory(newCategory);
    };

    const handleStartTimeChange = (value: string) => {
        const [hours, minutes] = value.split(":");
        const newStartTime = setHours(
            setMinutes(startTime, parseInt(minutes)),
            parseInt(hours)
        );
        setStartTime(newStartTime);
    };

    const handleEndTimeChange = (value: string) => {
        const [hours, minutes] = value.split(":");
        const newEndTime = setHours(
            setMinutes(endTime, parseInt(minutes)),
            parseInt(hours)
        );
        setEndTime(newEndTime);
    };

    const generateTimeOptions = () => {
        const options = [];
        let currentTime = startOfDay(selectedDate);
        while (currentTime < addHours(startOfDay(selectedDate), 24)) {
            options.push(
                <SelectItem
                    key={currentTime.toISOString()}
                    value={format(currentTime, "HH:mm")}
                >
                    {format(currentTime, "h:mm a")}
                </SelectItem>
            );
            currentTime = addMinutes(currentTime, 15);
        }
        return options;
    };

    const handleSaveTimeEntry = () => {
        const newEntry: TimeEntry = {
            id: uuidv4(),
            date: selectedDate.toISOString(),
            category,
            description,
            startTime: startTime,
            endTime: endTime,
        };
        onAddTimeEntry(newEntry);
        onClose();
    };
    const calculateTotalHours = (start: Date, end: Date) => {
        const duration = moment.duration(moment(end).diff(moment(start)));
        const hours = duration.hours();
        const minutes = duration.minutes();

        if (minutes === 0) {
            return `${hours} hour${hours === 1 ? "" : "s"}`;
        } else {
            return `${hours} hour${hours === 1 ? "" : "s"} ${minutes} minute${
                minutes === 1 ? "" : "s"
            }`;
        }
    };

    return (
        <div>
            <div className="flex gap-2 justify-start">
                <div className="w-full">
                    <Label htmlFor="startTime">Start</Label>
                    <Select
                        onValueChange={handleStartTimeChange}
                        defaultValue={format(startTime, "HH:mm")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select start time">
                                {format(startTime, "h:mm a")}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>{generateTimeOptions()}</SelectContent>
                    </Select>
                </div>

                <div className="w-full">
                    <Label htmlFor="endTime">End</Label>
                    <Select
                        onValueChange={handleEndTimeChange}
                        defaultValue={format(endTime, "HH:mm")}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select end time">
                                {format(endTime, "h:mm a")}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent>{generateTimeOptions()}</SelectContent>
                    </Select>
                </div>
            </div>
            <div className="mt-4">
                <p className="text-lg font-semibold">
                    {calculateTotalHours(startTime, endTime)}
                </p>
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
