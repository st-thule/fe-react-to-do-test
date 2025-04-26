import React, { forwardRef } from 'react';

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
      onInputBlur,
      onInputChange,
      value,
      errorMessage,
    },
    ref
  ) => {
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      if (onInputBlur) {
        onInputBlur(event.target.value);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (onInputChange) {
        onInputChange(event.target.value);
      }
    };

    return (
      <div className="input-wrapper">
        {label && <label>{label}</label>}
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
          onBlur={handleBlur}
          onChange={handleChange}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    );
  }
);
