import React from "react";
import { Calendar, momentLocalizer, Event } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { TimeEntry } from "@/types/TimeEntry";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

interface WeekViewProps {
    timeEntries: TimeEntry[];
    onSelectSlot: (slotInfo: { start: Date; end: Date }) => void;
    onTimeEntriesChange: (updatedEntries: TimeEntry[]) => void;
    getCategoryColor: (categoryName: string) => string;
    selectedDate: Date;
}

export const WeekView: React.FC<WeekViewProps> = ({
    timeEntries,
    onSelectSlot,
    getCategoryColor,
    selectedDate,
    onTimeEntriesChange,
}) => {
    const events: Event[] = timeEntries.map((entry) => ({
        id: entry.id,
        title: entry.category,
        start: new Date(entry.startTime),
        end: new Date(entry.endTime),
        color: getCategoryColor(entry.category),
    }));

    const eventStyleGetter = (event: Event) => {
        const backgroundColor = (event as any).color || "#3174ad";
        return {
            style: {
                backgroundColor,
                borderRadius: "4px",
                padding: "6px",
                fontWeight: "bold",
            },
        };
    };

    const handleEventResize = ({ event, start, end }: any) => {
        const updatedTimeEntries = timeEntries.map((entry) => {
            if (entry.id === event.id) {
                return {
                    ...entry,
                    startTime: start,
                    endTime: end,
                };
            }
            return entry;
        });
        onTimeEntriesChange(updatedTimeEntries);
    };

    const handleEventDrop = ({ event, start, end }: any) => {
        const updatedTimeEntries = timeEntries.map((entry) => {
            if (entry.id === event.id) {
                return {
                    ...entry,
                    startTime: start,
                    endTime: end,
                };
            }
            return entry;
        });
        onTimeEntriesChange(updatedTimeEntries);
    };
    const getEventStart = (event: Event) => event.start as Date;
    const getEventEnd = (event: Event) => event.end as Date;
    return (
        <div className="h-full">
            <DragAndDropCalendar
                localizer={localizer}
                events={events}
                startAccessor={getEventStart}
                endAccessor={getEventEnd}
                selectable
                resizable
                onEventDrop={handleEventDrop}
                onEventResize={handleEventResize}
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
