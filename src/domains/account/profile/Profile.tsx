import React from "react";
import { AvatarEdit } from "./components/AvatarEdit";
import { ProfileForm } from "./components/ProfileForm";
import { useGetApiArchitectAccounts } from "@/services/architect-services/api-architect-accounts-get";
import { Skeleton } from "@/components/ui/skeleton";

export const Profile = () => {
    const { data, isLoading } = useGetApiArchitectAccounts();

    const profile = data?.value;

    if (isLoading) {
        return (
            <div className="m-5 flex flex-col gap-3">
                <Skeleton className="w-[150px] h-[150px]" />
                <Skeleton className="h-4 w-[250px]" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-start gap-4">
            <div>
                <AvatarEdit profileImage={profile?.profileImage} />
            </div>
            <div>
                <ProfileForm defaultValues={profile} />
            </div>
        </div>
    );
};
