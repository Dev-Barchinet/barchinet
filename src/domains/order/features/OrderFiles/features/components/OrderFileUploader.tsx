import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { FileImage, Trash } from "lucide-react";
import React, { useState } from "react";

type OrderFileUploaderProps = {
  currentRevision: number;
  maximumRevisionCount: number;
  onFileChange: (files: File[]) => Promise<boolean>;
  onSubmit?: (files: File[]) => void;
  onDeleteFile?: (index: number) => Promise<boolean>;
  onCancel?: () => void;
  uploading: boolean;
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
      {file.name}
    </div>
  );
};

export const OrderFileUploader = (props: OrderFileUploaderProps) => {
  const {
    currentRevision,
    maximumRevisionCount,
    onFileChange,
    onDeleteFile,
    ...restProps
  } = props;
  const [files, setFiles] = useState<File[]>([]);
  const [uploadingNewFile, setUploadingNewFile] = useState(false);
  const [deletingFile, setDeletingFile] = useState(false);

  const handleDraftFileChange = (files: File[]) => {
    setUploadingNewFile(true);
    setFiles(files);

    onFileChange(files)
      .then((res) => {
        if (!res) {
          setFiles((prevFiles) => prevFiles.slice(0, prevFiles.length - 1));
        }
      })
      .finally(() => {
        setUploadingNewFile(false);
      });
  };

  const handleDeleteFile = (index: number) => {
    setDeletingFile(true);
    onDeleteFile?.(index)
      .then((response) => {
        if (response) {
          setFiles((prev) => {
            const updatedFiles = prev.filter((_, i) => i !== index);
            return updatedFiles;
          });
        }
      })
      .finally(() => {
        setDeletingFile(false);
      });
  };

  return (
    <div className="order-detail-box w-full p-4">
      <p className="title-3-5">Upload new file</p>
      <p className="title-5-5 mt-2">
        your uploading revision{" "}
        <span className="title-4">
          {currentRevision}/{maximumRevisionCount}
        </span>
      </p>
      <div className="pt-4">
        <FileUploader
          showReveiwer={false}
          onFileChanged={handleDraftFileChange}
          acceptedFormats="*"
          currentFiles={files}
          {...restProps}
          triggerElement={
            files.length === 0 ? (
              <div className="w-full rounded cursor-pointer h-[130px] bg-[#F4F4F4] flex flex-col items-center justify-center">
                <FileImage />
                <p>Upload File</p>
              </div>
            ) : (
              <div className="w-full flex items-center gap-4">
                <div className="w-[130px] cursor-pointer rounded h-[130px] bg-[#F4F4F4] flex flex-col items-center justify-center">
                  <FileImage />
                  <p>Upload File</p>
                </div>
                {files.map((file, index) => (
                  <div
                    key={file.name}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="max-w-[130px] max-h-[130px] relative"
                  >
                    {uploadingNewFile && index === files.length - 1 && (
                      <Skeleton className="w-32 h-32" />
                    )}
                    {!(uploadingNewFile && index === files.length - 1) && (
                      <>
                        {renderFilePreview(file, index)}
                        <Button
                          className="absolute bottom-1 left-1 max-w-[30px]"
                          loading={index === files.length - 1 && deletingFile}
                          onClick={() => handleDeleteFile(index)}
                        >
                          <Trash />
                        </Button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )
          }
        />
      </div>
    </div>
  );
};
