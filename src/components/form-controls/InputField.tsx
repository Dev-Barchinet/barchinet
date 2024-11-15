// InputField.tsx
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputFieldProps {
    label: string;
    placeholder: string;
    register?: UseFormRegisterReturn;
    type?: string;
    value?: string;
    onClick?: () => void;
    disabled?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
    label,
    placeholder,
    register,
    type = "text",
    value,
    onClick,
    disabled = false,
}) => (
    <div className="col-span-1">
        <Label>{label}</Label>
        <Input
            {...register}
            type={type}
            value={value}
            placeholder={placeholder}
            onClick={onClick}
            readOnly={type === "text" && !register}
            disabled={disabled}
        />
    </div>
);
