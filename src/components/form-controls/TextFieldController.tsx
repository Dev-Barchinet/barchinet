/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import { cn } from "@/lib/utils";

import {
  FormControl,
  FormDescription,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input, InputProps } from "../ui/input";

export interface TextFieldControllerProps<
  FieldValueType extends FieldValues = any
> {
  name: FieldPath<FieldValueType>;
  control?: Control<FieldValueType>;
  label?: React.ReactNode;
  description?: React.ReactNode;
  formRules?: RegisterOptions<FieldValueType>;
}

export function TextFieldController<
  FieldValueType extends FieldValues = object
>({
  name,
  control,
  description,
  formRules,
  ...props
}: TextFieldControllerProps<FieldValueType> & InputProps) {

  return (
    <Controller
      name={name}
      control={control}
      rules={formRules}
      render={({ field, fieldState }) => {
        const errorMessage = fieldState.error?.message;
        
        return (
          <FormItem className="w-full">
            <FormControl>
              <Input
                {...props}
                {...field}
                className={cn({
                  "bg-destructive/10 ring-2 ring-destructive ring-offset-2 focus-visible:ring-destructive focus-visible:ring-offset-1":
                    errorMessage,
                })}
              />
            </FormControl>

            {description && <FormDescription>{description}</FormDescription>}
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
          </FormItem>
        );
      }}
    />
  );
}
