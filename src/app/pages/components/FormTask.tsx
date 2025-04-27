import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form } from '@app/shared/components/partials/Form';
import { Status } from '@shared/constants/status';
import Button from '@app/shared/components/partials/Button';
import { Input } from '@shared/components/partials/Input';
import { Textarea } from '@shared/components/partials/TextArea';

interface IFormTaskProps {
  defaultValues?: {
    title: string;
    description: string;
    status: Status;
    dueDate: string;
  };
  onSubmit: (data: {
    title: string;
    description: string;
    status: Status;
    dueDate: string;
  }) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

export const FormTask: React.FC<IFormTaskProps> = ({
  defaultValues = {
    title: '',
    description: '',
    status: Status.NO_STARTED,
    dueDate: '',
  },
  onSubmit,
  onCancel,
  isEdit = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      defaultValues={defaultValues}
      className="task-form"
    >
      <div className="form-group">
        <Controller
          name="title"
          control={control}
          rules={{ required: 'Title is required' }}
          render={({ field }) => (
            <Input
              name="title"
              className="input"
              type="text"
              label="Title"
              {...field}
              errorMessage={errors.title?.message}
            />
          )}
        />
      </div>

      <div className="form-group">
        <Controller
          name="dueDate"
          control={control}
          rules={{ required: 'Due date is required' }}
          render={({ field }) => (
            <Input
              {...field}
              name="dueDate"
              label="Date"
              className="input"
              type="date"
              errorMessage={errors.dueDate?.message}
            />
          )}
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <div className="checkbox-group">
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={field.value === Status.NO_STARTED}
                    onChange={() => field.onChange(Status.NO_STARTED)}
                  />
                  Not Started
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={field.value === Status.IN_PROGRESS}
                    onChange={() => field.onChange(Status.IN_PROGRESS)}
                  />
                  In Progress
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={field.value === Status.COMPLETED}
                    onChange={() => field.onChange(Status.COMPLETED)}
                  />
                  Completed
                </label>
              </>
            )}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <Controller
          name="description"
          control={control}
          rules={{
            minLength: {
              value: 10,
              message: 'Description must be at least 10 characters',
            },
          }}
          render={({ field }) => (
            <Textarea
              className="textarea"
              name="description"
              {...field}
              rows={4}
              errorMessage={errors.description?.message}
            />
          )}
        />
      </div>

      <div className="modal-action">
        <Button
          className="btn btn-primary"
          label={isEdit ? 'Save' : 'Add'}
          type="submit"
        />
        <Button
          className="btn btn-secondary"
          label="Cancel"
          onClick={onCancel}
        />
      </div>
    </Form>
  );
};
