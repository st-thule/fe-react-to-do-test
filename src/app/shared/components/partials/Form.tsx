import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
interface IFormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  defaultValues: any;
}

export const Form: React.FC<IFormProps> = ({
  children,
  onSubmit,
  defaultValues,
}) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};
