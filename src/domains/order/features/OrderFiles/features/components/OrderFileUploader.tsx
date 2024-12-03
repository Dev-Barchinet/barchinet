import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { FileImage, Trash } from "lucide-react";
import React, { useState } from "react";

type OrderFileUploaderProps = {
  currentRevision: number;
  maximumRevisionCount: number;
  onFileChange: (files: File[]) => void;
  onSubmit?: (files: File[]) => void;
  onDeleteFile?: (index: File[]) => void;
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

  const handleDraftFileChange = (files: File[]) => {
    setFiles(files);
    onFileChange(files);
  };

  const handleDeleteDraftFile = (files: File[]) => {
    setFiles(files);
    onDeleteFile?.(files);
  };

  const handleDeleteFile = (index: number) => {
    setFiles((prev) => {
      const updatedFiles = prev.filter((_, i) => i !== index);
      return updatedFiles;
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
          onDeleteFile={handleDeleteDraftFile}
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
            )
          }
        />
      </div>
    </div>
  );
};
