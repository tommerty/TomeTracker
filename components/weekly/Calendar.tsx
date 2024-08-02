// components/weekly/WeekView.tsx
import React from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { TimeEntry } from "@/types/TimeEntry";

const localizer = momentLocalizer(moment);

interface WeekViewProps {
    timeEntries: TimeEntry[];
    onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
    getCategoryColor: (categoryName: string) => string;
    selectedDate: Date;
}

export const WeekView: React.FC<WeekViewProps> = ({
    timeEntries,
    onSelectSlot,
    getCategoryColor,
    selectedDate,
}) => {
    const events: Event[] = timeEntries.map((entry) => ({
        id: entry.id,
        title: entry.category,
        start: new Date(entry.startTime),
        end: new Date(entry.endTime),
        color: getCategoryColor(entry.category),
    }));

    const eventStyleGetter = (event: Event) => {
        // @ts-ignore
        const backgroundColor = event.color || "#3174ad";
        return {
            style: {
                backgroundColor,
                borderRadius: "4px",
                padding: "6px",
                fontWeight: "bold",
            },
        };
    };

    return (
        <div className="h-full">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={onSelectSlot}
                view="day"
                toolbar={false}
                style={{
                    height: "100%",
                }}
                className="overflow-hidden !border-0"
                eventPropGetter={eventStyleGetter}
                date={selectedDate}
                timeslots={4}
                step={15}
            />
        </div>
    );
};
