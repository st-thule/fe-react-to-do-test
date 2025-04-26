import React from 'react';

interface ButtonProps {
  className?: string;
  type?: 'button' | 'submit';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string | '';
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  className = '',
  type = 'button',
  onClick,
  label,
  icon,
}) => {
  return (
    <button className={`btn ${className}`} onClick={onClick}>
      <p>{label}</p>
      {icon && (
        <span className="btn-icon">
          <img src={icon} alt="button icon" />
        </span>
      )}
    </button>
  );
};

export default Button;
