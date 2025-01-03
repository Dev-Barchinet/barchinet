import FileUploader from "@/components/file-uploader";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useFileDownloader } from "@/core/hooks/useFileDownloader";
import { useDeleteApiArchitectAccountsImageRemove } from "@/services/architect-services/api-architect-accounts-image-remove-delete";
import { usePostApiArchitectAccountsImageUpload } from "@/services/architect-services/api-architect-accounts-image-upload-post";
import { Pen, Trash } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

type AvatarEditProps = {
    profileImage?: string | null;
};

export const AvatarEdit = (props: AvatarEditProps) => {
    const { profileImage } = props;
    const t = useTranslations("Profile.Avatar");
    const { data: session } = useSession();
    const fileAccessToken = session?.user?.fileAccessCredential;
    const accessToken = session?.user?.accessToken;

    const [selectedImage, setSelectedImage] = useState<
        string | undefined | null
    >(profileImage);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);

    const { mutateAsync: uploadNewImage, isLoading: isUploading } =
        usePostApiArchitectAccountsImageUpload();

    const { mutateAsync: deleteProfile, isLoading: deletingImage } =
        useDeleteApiArchitectAccountsImageRemove();

    const { getFileLink } = useFileDownloader(fileAccessToken, accessToken);

    const handleDeleteConfirm = () => {
        deleteProfile({ params: { UserImageType: 20007001 } }).then(
            (response) => {
                if (response.isSuccess) {
                    setSelectedImage(null);
                    setDeleteDialogOpen(false);
                    toast.success(t("imageDeleteSucceed"));
                }
            }
        );
    };

    const handleFileSubmit = async (files: File[]) => {
        if (files.length > 0) {
            try {
                await uploadNewImage({
                    data: { Image: files[0], UserImageType: 20007001 },
                }).then((response) => {
                    if (response.isSuccess) {
                        setEditDialogOpen(false);
                        setSelectedImage(URL.createObjectURL(files[0]));
                        toast.success(t("imageUpdateSucceed"));
                    }
                });
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };

    console.log(selectedImage);

    return (
        <div className="relative min-w-[150px] min-h-[150px] max-w-[150px] max-h-[150px] overflow-hidden rounded">
            <Image
                src={
                    selectedImage
                        ? selectedImage.includes("localhost") ||
                          selectedImage.includes("architect")
                            ? selectedImage
                            : getFileLink(selectedImage)
                        : "/assets/images/userAvatar.png"
                }
                width={150}
                height={150}
                alt="avatar"
                className="object-cover"
            />
            <div className="absolute bottom-1 right-1 flex items-center gap-1">
                {selectedImage && (
                    <Button
                        variant="secondary"
                        size="icon"
                        onClick={() => setDeleteDialogOpen(true)}
                    >
                        <Trash />
                    </Button>
                )}
                <Button
                    variant="secondary"
                    size="icon"
                    onClick={() => setEditDialogOpen(true)}
                >
                    <Pen />
                </Button>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Deletion</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete your avatar? This
                            action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleDeleteConfirm}
                            loading={deletingImage}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Edit (Upload New Picture) Dialog */}
            <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Upload new picture</DialogTitle>
                    </DialogHeader>
                    <FileUploader
                        disabled={false}
                        acceptedFormats="image/*"
                        onSubmit={handleFileSubmit} // Upload logic
                        onCancel={() => console.log("Upload cancelled")}
                        uploading={isUploading}
                        multiple={false} // Set to false to allow only one file
                        triggerElement={
                            <Button
                                className="bg-green-600 text-white"
                                disabled={isUploading}
                            >
                                Upload new
                            </Button>
                        }
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
};
