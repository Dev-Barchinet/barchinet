// DatePickerDialog.tsx
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogOverlay,
    DialogTitle,
} from "@/components/ui/dialog";
import { DatePicker } from "./ui/date-picker";

interface DatePickerDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onDateSelect: (date?: Date) => void;
    selectedDate?: string | null;
}

export const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
    isOpen,
    onClose,
    onDateSelect,
    selectedDate,
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogOverlay />
            <DialogTitle className="hidden" />
            <DialogContent
                aria-describedby={undefined}
                className="flex justify-center items-center max-w-fit"
            >
                <DatePicker
                    selected={
                        selectedDate ? new Date(selectedDate) : new Date()
                    }
                    onSelect={onDateSelect}
                />
            </DialogContent>
        </Dialog>
    );
};
