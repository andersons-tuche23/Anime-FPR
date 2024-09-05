/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Input } from "./styles";

interface CustomInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const CustomInput: React.FC<CustomInputProps> = ({ value, onChange, onKeyDown }) => {
  return (
    <div>
      <Input
        type="text"
        placeholder="Buscar"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default CustomInput;
