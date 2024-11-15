// SelectField.tsx
import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface SelectFieldProps {
    label: string;
    placeholder: string;
    value: string;
    onValueChange: (value: string) => void;
    options: { value: string; label: string }[];
}

export const SelectField: React.FC<SelectFieldProps> = ({
    label,
    placeholder,
    value,
    onValueChange,
    options,
}) => (
    <div className="col-span-1">
        <Label>{label}</Label>
        <Select onValueChange={onValueChange} value={value}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
);
