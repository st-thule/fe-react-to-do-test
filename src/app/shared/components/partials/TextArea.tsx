import React, { forwardRef } from 'react';

interface TextareaProps {
  name?: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
  maxLength?: number;
  minLength?: number;
  onInputBlur?: (value: string) => void;
  onInputChange?: (value: string) => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  value?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      name = '',
      label = '',
      placeholder = '',
      className = '',
      rows = 4,
      maxLength,
      minLength,
      isReadOnly = false,
      isDisabled = false,
      onBlur,
      onChange,
      value,
      errorMessage,
    },
    ref
  ) => {
    return (
      <div className="textarea-wrapper">
        {label && <label className="textarea-label">{label}</label>}
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          className={className}
          rows={rows}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={isReadOnly}
          disabled={isDisabled}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
