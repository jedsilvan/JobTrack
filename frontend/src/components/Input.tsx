import React from 'react';

interface InputProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const Input = ({ label, value, onChange, placeholder }: InputProps) => {
  return (
    <div>
      {label && <label>{label}</label>}
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="bg-(--color-card) border-1 border-border rounded-lg pt-1 pb-1.5 px-3 hover:border-secondary focus:border-secondary"
      />
    </div>
  );
};

export default Input;