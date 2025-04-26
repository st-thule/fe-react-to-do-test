import React, { forwardRef, useState } from 'react';

interface InputProps {
  name?: string;
  label?: string;
  placeHolder?: string;
  className?: string;
  maxLength?: number;
  minLength?: number;
  onInputBlur?: (value: string) => void;
  onInputChange?: (value: string) => void;
  isReadOnly?: boolean;
  isDisabled?: boolean;
  type?: string;
  value?: string | number;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name = '',
      label = '',
      className = '',
      type = 'text',
      placeHolder = '',
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
      <div className="input-wrapper">
        {label && <label className="input-label">{label}</label>}
        <input
          ref={ref}
          id={name}
          name={name}
          type={type}
          value={value}
          className={className}
          placeholder={placeHolder}
          maxLength={maxLength}
          minLength={minLength}
          readOnly={isReadOnly}
          disabled={isDisabled}
          onBlur={onBlur}
          onChange={onChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
