import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useFileDownloader } from "@/core/hooks/useFileDownloader";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type FileDisplayProps = {
    files: string[];
};

const FileDisplay = ({ files }: FileDisplayProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const { data: session } = useSession();
    const { downloadFile, isDownloading, getFileLink } = useFileDownloader(
        session?.user.fileAccessCredential,
        session?.user.accessToken
    );

    const handleDownloadAll = () => {
        files.forEach((file, index) => {
            downloadFile(file, `file-${index + 1}`);
        });
    };

    const isNextDisabled = files.length - 1 === activeIndex;
    const isPreviousDisabled = activeIndex === 0;

    const nextImage = () =>
        setActiveIndex((previosuIndex) => previosuIndex + 1);
    const previousImage = () =>
        setActiveIndex((previousIndex) => previousIndex - 1);

    return (
        <div className="min-w-[392px]">
            <div className="flex flex-col rounded-lg">
                <div className="relative flex items-center justify-center w-full h-[84px]">
                    {files.length > 0 && (
                        <Image
                            src={getFileLink(files[0])}
                            alt="First File"
                            fill
                            className="absolute z-10 w-2/3 h-2/3 object-cover rounded-lg"
                        />
                    )}
                </div>
                <Button
                    variant="link"
                    onClick={() => setIsModalOpen(true)}
                    className="ml-auto max-w-[60px]"
                >
                    More <ChevronRight />
                </Button>
            </div>

            <Dialog
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen(false)}
            >
                <DialogContent>
                    <DialogTitle className="text-lg font-semibold mb-4">
                        Files
                    </DialogTitle>
                    <div>
                        <Image
                            alt="file"
                            width={180}
                            height={180}
                            src={files[activeIndex]}
                        />
                    </div>
                    <div className="flex items-center justify-between w-full gap-2">
                        <Button
                            className="max-w-[30px]"
                            variant="ghost"
                            disabled={isPreviousDisabled}
                            onClick={previousImage}
                        >
                            <ChevronLeft />
                        </Button>
                        <div className="flex items-center flex-1 gap-2 overflow-auto">
                            {files.map((file, index) => (
                                <Image
                                    key={file + index}
                                    src={`${
                                        process.env.NEXT_PUBLIC_GATEWAY
                                    }${file}?token=${getFileLink(file)}`}
                                    alt={`File ${index + 1}`}
                                    width={20}
                                    height={20}
                                    className="object-cover rounded-lg"
                                />
                            ))}
                        </div>
                        <Button
                            className="max-w-[30px]"
                            variant="ghost"
                            disabled={isNextDisabled}
                            onClick={nextImage}
                        >
                            <ChevronRight />
                        </Button>
                    </div>
                    <div className="flex justify-between">
                        <Button
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            className="max-w-[30%]"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDownloadAll}
                            disabled={isDownloading}
                            loading={isDownloading}
                            className="max-w-[30%]"
                        >
                            <Download /> Download all
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default FileDisplay;
