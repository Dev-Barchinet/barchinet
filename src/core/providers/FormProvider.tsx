/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

interface FormWrapperProps {
  onSubmit: SubmitHandler<any>;
  children: React.ReactNode;
  className?: string
}

const FormWrapper: React.FC<FormWrapperProps> = ({ onSubmit, children, className }) => {
  const methods = useForm();

  return (
    <FormProvider {...methods}>
      <form className={className || ''} onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default FormWrapper;
