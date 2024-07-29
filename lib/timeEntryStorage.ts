import { TimeEntry } from '@/types/TimeEntry';

const TIME_ENTRIES_KEY = 'timeEntries';

export const saveTimeEntries = (entries: TimeEntry[]): void => {
    localStorage.setItem('timeEntries', JSON.stringify(entries));
  };

  export const loadTimeEntries = (): TimeEntry[] => {
    const storedEntries = localStorage.getItem('timeEntries');
    if (!storedEntries) return [];
  
    return JSON.parse(storedEntries, (key, value) => {
      if (key === 'date' || key === 'startTime' || key === 'endTime') {
        return new Date(value);
      }
      return value;
    });
  };
