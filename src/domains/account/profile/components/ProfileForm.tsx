import { DatePickerDialog } from "@/components/date-picker-dialog";
import { InputField } from "@/components/form-controls/InputField";
import { SelectField } from "@/components/form-controls/SelectField";
import { Button } from "@/components/ui/button";
import {
    DomainFeaturesIdentityUsersEnumsGenderTypeEnum,
    IdentityUsersQueriesV1SharedAccountGetAccountQueryResult,
} from "@/services/architect-services/api-architect-accounts-get.schemas";
import { usePutApiArchitectAccounts } from "@/services/architect-services/api-architect-accounts-put";
import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CitySelect } from "./CitySelect";
import { CountrySelect } from "./CountrySelect";
import { IdentityUsersCommandsV1ArchitectsAccountUpdateArchitectAccountCommand } from "@/services/architect-services/api-architect-accounts-put.schemas";
import toast from "react-hot-toast";
import { StateSelect } from "./StateSelect";
import { ResetPasswordProfile } from "./ResetPasswordProfile";

type FormData = IdentityUsersQueriesV1SharedAccountGetAccountQueryResult;

const validKeys = [
    "birthDate",
    "cellPhoneNumber",
    "cityId",
    "countryId",
    "firstName",
    "address",
    "genderType",
    "instagram",
    "lastName",
    "linkedIn",
    "passportNumber",
    "stateId",
    "username",
    "website",
] as const;

interface ProfileFormProps {
    defaultValues?: Partial<FormData>;
}
const GenderEnum = {
    UNSPECIFIED: 20003001,
    MALE: 20003002,
    FEMALE: 20003003,
};

export const ProfileForm: React.FC<ProfileFormProps> = ({ defaultValues }) => {
    const { register, handleSubmit, reset, setValue, watch } = useForm({
        defaultValues,
    });
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const birthDate = watch("birthDate");
    const t = useTranslations("Profile.Form");

    const { mutateAsync: updateProfile, isLoading } =
        usePutApiArchitectAccounts();

    const getGenderLabel = (genderType: number) => {
        switch (genderType) {
            case GenderEnum.FEMALE:
                return t("genderFemale");
            case GenderEnum.MALE:
                return t("genderMale");
            case GenderEnum.UNSPECIFIED:
                return t("genderUnspecified");
            default:
                return t("genderUnspecified"); // Default to unspecified if no match
        }
    };

    useEffect(() => {
        if (defaultValues) {
            reset(defaultValues);
        }
    }, [defaultValues, reset]);

    const filterData = (
        data: FormData
    ): IdentityUsersCommandsV1ArchitectsAccountUpdateArchitectAccountCommand => {
        const filteredData: Partial<IdentityUsersCommandsV1ArchitectsAccountUpdateArchitectAccountCommand> =
            {};

        validKeys.forEach((key) => {
            if (key === "address") {
                filteredData.fullAddress = data.address;
            } else if (key === "genderType") {
                filteredData.genderType = data.genderType;
            } else {
                filteredData[key] = data[key];
            }
        });

        return filteredData as IdentityUsersCommandsV1ArchitectsAccountUpdateArchitectAccountCommand;
    };

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        const filteredData = filterData(data);

        updateProfile({ data: filteredData }).then((response) => {
            if (response.isSuccess) {
                toast.success(t("profileUpdated"));
            }
        });
    };

    const handleDateChange = (date?: Date) => {
        if (date) {
            const formattedDate = new Date(date).toLocaleDateString("en-CA");
            setValue("birthDate", formattedDate);
        }
        setIsDatePickerOpen(false);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-4 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
            <h2 className="col-span-full text-lg font-semibold">
                {t("privateInformation")}
            </h2>

            <InputField
                label={t("name")}
                placeholder={t("namePlaceholder")}
                register={register("firstName")}
            />
            <InputField
                label={t("familyName")}
                placeholder={t("familyNamePlaceholder")}
                register={register("lastName")}
            />

            <InputField
                label={t("birthDate")}
                placeholder={t("birthDatePlaceholder")}
                value={new Date(birthDate || "").toLocaleDateString("en-CA")}
                onClick={() => setIsDatePickerOpen(true)}
            />

            <DatePickerDialog
                isOpen={isDatePickerOpen}
                onClose={() => setIsDatePickerOpen(false)}
                onDateSelect={handleDateChange}
                selectedDate={birthDate}
            />

            <SelectField
                label={t("gender")}
                placeholder={t("genderPlaceholder")}
                value={watch("genderType")?.toString() || ""}
                onValueChange={(value) => {
                    setValue(
                        "genderType",
                        Number(
                            value
                        ) as DomainFeaturesIdentityUsersEnumsGenderTypeEnum
                    );
                    setValue("genderTypeTitle", getGenderLabel(+value));
                }}
                options={[
                    {
                        value: GenderEnum.FEMALE.toString(),
                        label: t("genderFemale"),
                    },
                    {
                        value: GenderEnum.MALE.toString(),
                        label: t("genderMale"),
                    },
                    {
                        value: GenderEnum.UNSPECIFIED.toString(),
                        label: t("genderUnspecified"),
                    },
                ]}
            />

            <InputField
                label={t("mobileNumber")}
                placeholder={t("mobileNumberPlaceholder")}
                register={register("cellPhoneNumber")}
            />
            <InputField
                label={t("email")}
                placeholder={t("emailPlaceholder")}
                register={register("emailAddress")}
                type="email"
                disabled
            />
            <InputField
                label={t("passportNumber")}
                placeholder={t("passportNumberPlaceholder")}
                register={register("passportNumber")}
            />

            <h2 className="col-span-full text-lg font-semibold mt-4">
                {t("address")}
            </h2>

            <CountrySelect
                label={t("country")}
                placeholder={t("countryPlaceholder")}
                value={watch("countryId")?.toString()}
                onValueChange={(value) => {
                    setValue("countryId", value);
                    setValue("stateId", undefined);
                    setValue("cityId", undefined);
                }}
            />

            <StateSelect
                value={watch("stateId")?.toString()}
                onValueChange={(value) => {
                    setValue("stateId", value);
                }}
                label={t("state")}
                placeholder={t("statePlaceholder")}
                countryId={watch("countryId")?.toString()}
            />

            <CitySelect
                label={t("city")}
                onValueChange={(value) => {
                    setValue("cityId", value);
                }}
                placeholder={t("cityPlaceholder")}
                value={watch("cityId")}
                countryId={watch("countryId")?.toString()}
                stateId={watch("stateId")?.toString()}
            />

            <InputField
                label={t("address")}
                placeholder={t("addressPlaceholder")}
                register={register("address")}
            />

            <h2 className="col-span-full text-lg font-semibold mt-4">
                {t("password")}
            </h2>

            <ResetPasswordProfile />

            <h2 className="col-span-full text-lg font-semibold mt-4">
                {t("socialMedia")}
            </h2>
            <InputField
                label={t("linkedin")}
                placeholder={t("linkedinPlaceholder")}
                register={register("linkedIn")}
            />
            <InputField
                label={t("instagram")}
                placeholder={t("instagramPlaceholder")}
                register={register("instagram")}
            />

            <div className="col-span-full flex justify-start sm:justify-end mt-4">
                <Button type="submit" variant="default" loading={isLoading}>
                    {t("save")}
                </Button>
            </div>
        </form>
    );
};
