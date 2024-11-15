"use client";

import * as React from "react";
import { getMonth, getYear, setMonth, setYear } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./select";

interface DatePickerProps {
    startYear?: number;
    endYear?: number;
    selected?: Date;
    onSelect: (newDate?: Date) => void;
}
export function DatePicker({
    startYear = getYear(new Date()) - 100,
    endYear = getYear(new Date()) + 100,
    selected,
    onSelect,
}: DatePickerProps) {
    const [date, setDate] = React.useState<Date>(selected || new Date());

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const years = Array.from(
        { length: endYear - startYear + 1 },
        (_, i) => startYear + i
    );

    const handleMonthChange = (month: string) => {
        const newDate = setMonth(date, months.indexOf(month));
        setDate(newDate);
    };

    const handleYearChange = (year: string) => {
        const newDate = setYear(date, parseInt(year));
        setDate(newDate);
    };

    const handleSelect = (selectedData: Date | undefined) => {
        if (selectedData) {
            setDate(selectedData);
            onSelect(selectedData);
        }
    };

    return (
        <div>
            <div className="flex justify-between p-2">
                <Select
                    onValueChange={handleMonthChange}
                    value={months[getMonth(date)]}
                >
                    <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((month) => (
                            <SelectItem key={month} value={month}>
                                {month}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={handleYearChange}
                    value={getYear(date).toString()}
                >
                    <SelectTrigger className="w-[110px]">
                        <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                initialFocus
                month={date}
                onMonthChange={setDate}
            />
        </div>
    );
}
