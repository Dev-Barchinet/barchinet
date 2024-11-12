import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

// Define the shape of the form data
interface FormData {
  mobileNumber: string;
  username: string;
  name: string;
  familyName: string;
  email: string;
  passportNumber: string;
  birthDate: string;
  gender: "female" | "male";
  password: string;
}

interface ProfileFormProps {
  defaultValues?: Partial<FormData>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ defaultValues }) => {
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues,
  });

  const t = useTranslations("Profile.Form");

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-4 p-4 sm:grid-cols-2  lg:grid-cols-4"
    >
      <div className="col-span-1">
        <Label>{t("mobileNumber")}</Label>
        <Input
          {...register("mobileNumber")}
          placeholder={t("mobileNumberPlaceholder")}
        />
      </div>

      <div className="col-span-1">
        <Label>{t("username")}</Label>
        <Input {...register("username")} placeholder={t("usernamePlaceholder")} />
      </div>

      <div className="col-span-1">
        <Label>{t("name")}</Label>
        <Input {...register("name")} placeholder={t("namePlaceholder")} />
      </div>

      <div className="col-span-1">
        <Label>{t("familyName")}</Label>
        <Input {...register("familyName")} placeholder={t("familyNamePlaceholder")} />
      </div>

      <div className="col-span-1">
        <Label>{t("email")}</Label>
        <Input {...register("email")} placeholder={t("emailPlaceholder")} type="email" />
      </div>

      <div className="col-span-1">
        <Label>{t("passportNumber")}</Label>
        <Input {...register("passportNumber")} placeholder={t("passportNumberPlaceholder")} />
      </div>

      <div className="col-span-1">
        <Label>{t("birthDate")}</Label>
        <Input
          {...register("birthDate")}
          placeholder={t("birthDatePlaceholder")}
          type="date"
        />
      </div>

      <div className="col-span-1">
        <Label>{t("gender")}</Label>
        <Select {...register("gender")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t("genderPlaceholder")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="female">{t("genderFemale")}</SelectItem>
            <SelectItem value="male">{t("genderMale")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="col-span-1">
        <Label>{t("password")}</Label>
        <Input {...register("password")} placeholder={t("passwordPlaceholder")} type="password" />
      </div>

      <div className="col-span-1 flex items-end">
        <Button type="button" variant="secondary">
          {t("resetPassword")}
        </Button>
      </div>

      <div className="col-span-full flex justify-start sm:justify-end">
        <Button type="submit">{t("save")}</Button>
      </div>
    </form>
  );
};
