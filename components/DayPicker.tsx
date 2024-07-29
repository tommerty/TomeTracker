"use client"
import React, { useState } from 'react';
import { Calendar } from './ui/calendar';

interface DayPickerProps {
    selected: Date;
    onSelect: (date: Date | undefined) => void;
  }
  const DayPicker: React.FC<DayPickerProps> = ({ selected, onSelect }) => {

  return (
      <Calendar mode='single' selected={selected} onSelect={onSelect}/>
  );
};

export default DayPicker;
