import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetApiArchitectIssuesLocalized } from "@/services/architect-services/api-architect-issues-localized-get";
import { CrmIssuesQueriesV1SharedGetIssuesGetLocalIssuesBriefQueryResult } from "@/services/architect-services/api-architect-issues-localized-get.schemas";
import { usePostApiArchitectTicketsAttachment } from "@/services/architect-services/api-architect-tickets-attachment-post";
import { usePostApiArchitectTickets } from "@/services/architect-services/api-architect-tickets-post";
import { useGetApiArchitectTopicsLocalized } from "@/services/architect-services/api-architect-topics-localized-get";
import { CrmTopicsQueriesV1SharedGetTopicsGetLocalTopicsBriefQueryResult } from "@/services/architect-services/api-architect-topics-localized-get.schemas";
import { FileImage, LoaderIcon, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type AddTicketFormType = {
  topicId: string;
  issueId: string;
  subject: string;
  description: string;
  files: File[];
};

type AddTicketModalProps = {
  onTicketCreated: () => void;
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

export const AddTicketModal = (props: AddTicketModalProps) => {
  const { onTicketCreated } = props;
  const { mutateAsync: uploadFileToTicket, isLoading: uploadingFileToTicket } =
    usePostApiArchitectTicketsAttachment();

  const { mutateAsync: createTicket, isLoading: creatingTicketBody } =
    usePostApiArchitectTickets();

  const isLoading = creatingTicketBody || uploadingFileToTicket;

  const t = useTranslations("ContactUs.Ticketing");
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<AddTicketFormType>({
    defaultValues: {
      topicId: "",
      issueId: "",
      subject: "",
      description: "",
      files: [],
    },
  });

  const { data: issuesResponse, isLoading: fetchingIssues } =
    useGetApiArchitectIssuesLocalized(
      { TopicId: watch("topicId") },
      { query: { enabled: Boolean(watch("topicId")) } }
    );
  const { data: topicsResponse, isLoading: fetchingTopics } =
    useGetApiArchitectTopicsLocalized();

  const files = watch("files");

  const handleFileUpload = (newFiles: File[]) => {
    setValue("files", newFiles);
  };

  const onSubmit = async (data: AddTicketFormType) => {
    const { files, ...restFormData } = data;
    createTicket({ data: { ...restFormData } }).then((response) => {
      if (response.isSuccess) {
        if (files.length > 0) {
          files.map((file) => {
            uploadFileToTicket({
              data: { File: file, TicketId: response.value?.id, Ordering: 0 },
            });
          });
        }
        toast.success(t("ticketCreated"));
        onTicketCreated();
      }
    });
  };

  const handleDeleteFile = (index: number) => {
    setValue(
      "files",
      files.filter((_, i) => i !== index)
    );
  };

  const getSelectedTopicTitle = (
    topics:
      | readonly CrmTopicsQueriesV1SharedGetTopicsGetLocalTopicsBriefQueryResult[]
      | null
      | undefined,
    id: string
  ): string => {
    return (
      topics?.find((topic) => topic.topicId === id)?.title || "Topic Title"
    );
  };

  const getSelectedIssueTitle = (
    issues:
      | readonly CrmIssuesQueriesV1SharedGetIssuesGetLocalIssuesBriefQueryResult[]
      | null
      | undefined,
    id: string
  ): string => {
    return issues?.find((issue) => issue.issueId === id)?.title || "Issue Id";
  };

  const submitFormIsDisabled = !isValid || isLoading;

  return (
    <div className="flex flex-col w-full max-h-[60dvh] overflow-y-auto scrollbar-hide">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 px-1 max-w-md"
      >
        <div>
          <Label className="block mb-3 font-semibold">{t("topic")}</Label>
          <Controller
            name="topicId"
            control={control}
            rules={{ required: "Please select a topic" }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  {field.value
                    ? getSelectedTopicTitle(topicsResponse?.value, field.value)
                    : t("selectTopic")}
                </SelectTrigger>
                <SelectContent>
                  {fetchingTopics && (
                    <div className="w-full rotate-animation py-5">
                      <LoaderIcon />
                    </div>
                  )}
                  {!fetchingTopics &&
                    topicsResponse &&
                    topicsResponse.value?.map((topic) => (
                      <SelectItem
                        key={topic.topicId}
                        value={topic.topicId || ""}
                      >
                        {topic.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.topicId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.topicId.message}
            </p>
          )}
        </div>

        <div>
          <Label className="block mb-3 font-semibold">{t("issue")}</Label>
          <Controller
            name="issueId"
            control={control}
            rules={{ required: "Please select a topic" }}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!Boolean(watch("topicId"))}
              >
                <SelectTrigger>
                  {field.value
                    ? getSelectedIssueTitle(issuesResponse?.value, field.value)
                    : t("selectIssue")}
                </SelectTrigger>
                <SelectContent>
                  {fetchingIssues && (
                    <div className="w-full rotate-animation py-5">
                      <LoaderIcon />
                    </div>
                  )}
                  {!fetchingIssues &&
                    issuesResponse &&
                    issuesResponse.value?.map((issue) => (
                      <SelectItem
                        key={issue.issueId}
                        value={issue.issueId || ""}
                      >
                        {issue.title}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.issueId && (
            <p className="text-red-500 text-sm mt-1">
              {errors.issueId.message}
            </p>
          )}
        </div>

        {/* Request Subject */}
        <div>
          <Label htmlFor="subject" className="block mb-2 font-semibold">
            Request Subject
          </Label>
          <Controller
            name="subject"
            control={control}
            rules={{ required: "Request Subject is required" }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter request subject"
                id="subject"
                className="w-full"
              />
            )}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="block mb-2 font-semibold">
            Description
          </Label>
          <Controller
            name="description"
            control={control}
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <Textarea
                {...field}
                placeholder="Enter description"
                id="description"
                className="w-full h-28"
              />
            )}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
        <FileUploader
          disabled={false}
          showReveiwer={false}
          onFileChanged={handleFileUpload}
          acceptedFormats="*"
          triggerElement={
            files.length === 0 ? (
              <div className="w-full rounded cursor-pointer h-[130px] bg-[#F4F4F4] flex flex-col items-center justify-center">
                <FileImage />
                <p>Upload File</p>
              </div>
            ) : (
              <div className="max-w-full overflow-x-auto scrollbar-hide flex items-center gap-4">
                <div className="min-w-[130px] w-[130px] cursor-pointer rounded h-[130px] bg-[#F4F4F4] flex flex-col items-center justify-center">
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
                    className=" min-w-[130px] max-w-[130px] max-h-[130px] relative"
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
          currentFiles={files}
          uploading={isLoading}
          showSubmit={false}
        />

        {/* Submit Button */}
        <div className="w-full flex">
          <Button
            type="submit"
            disabled={submitFormIsDisabled}
            className="max-w-[120px] ml-auto"
          >
            {t("submit")}
          </Button>
        </div>
      </form>
    </div>
  );
};
