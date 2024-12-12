import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { usePostApiArchitectChats } from "@/services/architect-services/api-architect-chats-post";
import { Plus, Send, Trash } from "lucide-react";
import React, { useState } from "react";

type ChatFormProps = {
    chatId: string;
    recieverId?: string;
    refetchMessages: () => void;
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
            className="w-32 h-32 bg-gray-300 rounded-md flex items-center text-center justify-center p-2 text-wrap text-white"
        >
            <p className="text-wrap max-w-full">{file.name}</p>
        </div>
    );
};

export const ChatForm = (props: ChatFormProps) => {
    const { chatId, recieverId, refetchMessages } = props;
    const [files, setFiles] = useState<File[]>([]);
    const [message, setMessage] = useState("");
    const { mutateAsync: postMessage, isLoading: handleSendingMessage } =
        usePostApiArchitectChats();

    const handleFileSelect = (files: File[]) => {
        setFiles(files);
    };

    const handleDeleteFile = (index: number) => {
        setFiles((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            return updatedFiles;
        });
    };

    const handleSendMessage = async () => {
        if (files.length === 0 && !message) return;

        const response = await postMessage({
            data: {
                ChatId: chatId,
                ReceiverId: recieverId,
                File: files[0] || undefined,
                Message: message || undefined,
            },
        });

        if (response.isSuccess) {
            // handle getting messages
            refetchMessages();
            // reset form
            setFiles([]);
            setMessage("");
        }
    };

    return (
        <div className="conversation-layout-border flex flex-col gap-2 p-3 max-w-full">
            {files && files.length > 0 && (
                <div className="flex items-center gap-2 max-w-full overflow-x-auto">
                    {files.map((file, index) => (
                        <div
                            key={file.name}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            className="min-w-[130px] max-w-[130px] max-h-[130px] relative"
                        >
                            {renderFilePreview(file, index)}
                            <Button
                                className="absolute bottom-1 left-1 max-w-[30px]"
                                onClick={() => handleDeleteFile(index)}
                            >
                                <Trash />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
            <div className="flex items-end gap-3">
                <div className="max-w-[36px]">
                    <FileUploader
                        disabled={false}
                        uploading={false}
                        acceptedFormats="*"
                        triggerElement={
                            <div className="flex items-center justify-center p-4 bg-black rounded-md max-w-[32px] max-h-[36px] cursor-pointer">
                                <Plus className="text-white w-4 h-4 min-w-fit" />
                            </div>
                        }
                        showReveiwer={false}
                        showSubmit={false}
                        currentFiles={files}
                        multiple={false}
                        onFileChanged={handleFileSelect}
                    />
                </div>
                <textarea
                    className="focus:outline-none focus:border-transparent flex-1 rounded-md resize-none h-[30px] overflow-y-auto max-h-[200px]"
                    placeholder="Type your message here..."
                    onInput={(e) => {
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-expect-error
                        e.target.style.height = `${Math.min(
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error
                            e.target.scrollHeight,
                            200
                        )}px`;
                    }}
                ></textarea>
                <Button
                    className="max-w-[100px]"
                    onClick={handleSendMessage}
                    loading={handleSendingMessage}
                >
                    Send <Send />
                </Button>
            </div>
        </div>
    );
};
