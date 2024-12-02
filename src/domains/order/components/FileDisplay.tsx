import { useState, useRef, useEffect } from "react";
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

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const handleDownloadAll = () => {
    files.forEach((file, index) => {
      downloadFile(file, `file-${index + 1}`);
    });
  };

  const isNextDisabled = files.length - 1 === activeIndex;
  const isPreviousDisabled = activeIndex === 0;

  const nextImage = () => setActiveIndex((prevIndex) => prevIndex + 1);
  const previousImage = () => setActiveIndex((prevIndex) => prevIndex - 1);

  // Scroll to the active thumbnail when activeIndex changes
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnails = thumbnailsRef.current.children;
      const activeThumbnail = thumbnails[activeIndex] as HTMLElement;

      if (activeThumbnail) {
        activeThumbnail.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeIndex]);

  return (
    <div className="min-w-[392px] mt-5">
      <div className="flex flex-col gap-5 rounded-lg">
        <div className="relative flex w-full h-[84px]">
          {files.length > 0 && (
            <Image
              src={getFileLink(files[0])}
              alt="First File"
              fill
              className="object-contain rounded-lg"
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

      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        <DialogContent>
          <DialogTitle className="text-lg font-semibold mb-4">Files</DialogTitle>
          <div className="max-w-[29rem]">
            <div className="w-full relative h-[300px]">
              <Image
                alt="file"
                src={getFileLink(files[activeIndex])}
                fill
                className="max-h-[300px] h-[300px] object-contain"
              />
            </div>
            <div className="flex items-center justify-between w-full max-w-full gap-2 my-2">
              <Button
                className="max-w-[30px]"
                variant="ghost"
                disabled={isPreviousDisabled}
                onClick={previousImage}
              >
                <ChevronLeft />
              </Button>
              <div
                ref={thumbnailsRef}
                className="flex items-center flex-1 max-w-[calc(29rem-80px)] gap-2 overflow-x-auto"
              >
                {files.map((file, index) => (
                  <div
                    className={`${
                      activeIndex === index && "border-2"
                    } rounded-lg cursor-pointer border-black min-w-11 w-11 grid place-content-center h-11`}
                    key={file + index}
                    onClick={() => setActiveIndex(index)}
                  >
                    <Image
                      src={getFileLink(file)}
                      alt={`File ${index + 1}`}
                      width={40}
                      height={40}
                      className="object-contain max-h-[40px] rounded-lg"
                    />
                  </div>
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FileDisplay;
