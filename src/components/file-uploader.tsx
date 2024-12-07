import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";
import { XIcon } from "lucide-react";

interface FileUploaderProps {
    acceptedFormats: string; // A comma-separated list of accepted file formats (e.g., "image/*,video/*")
    onFileChanged?: (files: File[]) => void; // Custom file change handler
    onSubmit?: (files: File[]) => Promise<boolean> | void; // Custom submit handler
    onDeleteFile?: (index: File[]) => void; // Custom file delete handler
    onCancel?: () => void; // Custom cancel handler
    multiple?: boolean; // Whether multiple files can be selected
    uploading: boolean;
    triggerElement: React.ReactNode; // Custom element for triggering the file input
    showReveiwer?: boolean;
    currentFiles?: File[];
    disabled: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
    acceptedFormats,
    onFileChanged,
    onSubmit,
    onDeleteFile,
    onCancel,
    multiple = true,
    triggerElement,
    uploading,
    showReveiwer = true,
    currentFiles,
    disabled,
}) => {
    const [files, setFiles] = useState<File[]>([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        if (currentFiles) {
            setFiles(currentFiles);
        }
    }, [currentFiles]);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter((file) =>
            acceptedFormats === "*"
                ? file
                : new RegExp(`(${acceptedFormats.replace(/,/g, "|")})`).test(
                      file.type
                  )
        );
        setFiles((prev) => {
            const updatedFiles = [...prev, ...validFiles];
            if (onFileChanged) onFileChanged(updatedFiles);
            return updatedFiles;
        });
    };

    const handleDeleteFile = (index: number) => {
        setFiles((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            if (onDeleteFile) onDeleteFile(updatedFiles);
            return updatedFiles;
        });
    };

    const handleSubmit = async () => {
        setIsDialogOpen(false);
        if (onSubmit) {
            const response = await onSubmit(files);
            console.log({ response, isBoolean: typeof response === "boolean" });
            if (typeof response === "boolean" && response) {
                console.log('files')
                setFiles([]);
                onFileChanged?.([]);
            }
        }
    };

    const renderFilePreview = (file: File, index: number) => {
        const fileURL = URL.createObjectURL(file);

        if (file.type.startsWith("image/")) {
            return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    key={index}
                    src={fileURL}
                    alt={`file-${index}`}
                    className="w-32 h-32 object-cover rounded-md"
                />
            );
        }

        if (file.type.startsWith("video/")) {
            return (
                <video
                    key={index}
                    controls
                    src={fileURL}
                    className="w-32 h-32 rounded-md"
                />
            );
        }

        return (
            <div
                key={index}
                className="w-32 h-32 bg-gray-300 rounded-md flex items-center justify-center text-white"
            >
                File
            </div>
        );
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const isUploadDisabled = (!multiple && files.length >= 1) || disabled;

    return (
        <div className="space-y-4 w-full max-w-full">
            {/* Custom File Input Trigger */}
            <div
                onClick={triggerFileInput}
                className={` max-w-full   w-full
                        ${
                            isUploadDisabled
                                ? "cursor-not-allowed opacity-50 "
                                : ""
                        }

                        `}
            >
                {triggerElement}
            </div>
            <Button
                onClick={() => setIsDialogOpen(true)}
                className="max-w-[150px] ml-auto flex"
                loading={uploading}
                disabled={!files || files.length === 0}
            >
                Submit
            </Button>

            {/* Simplified File Previews */}
            {showReveiwer && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                    {files.map((file, index) => (
                        <div key={index} className="relative">
                            {renderFilePreview(file, index)}
                            <button
                                onClick={() => handleDeleteFile(index)}
                                disabled={uploading}
                                className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Dialog for confirmation */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button className="hidden" />
                </DialogTrigger>
                <DialogContent className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>Confirm File Upload</DialogTitle>
                    </DialogHeader>
                    <div className="flex justify-between">
                        <Button
                            onClick={() => {
                                setIsDialogOpen(false);
                                if (onCancel) onCancel();
                            }}
                            className="bg-gray-500 text-white"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            className="bg-blue-600 text-white"
                        >
                            Submit Files
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Hidden File Input */}
            <input
                type="file"
                ref={fileInputRef}
                accept={acceptedFormats}
                onChange={handleFileChange}
                multiple={multiple}
                disabled={isUploadDisabled} // Disable file input if not multiple and a file is selected
                className="hidden"
            />
        </div>
    );
};

export default FileUploader;
