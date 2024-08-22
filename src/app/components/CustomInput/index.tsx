/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Input, InputContainer } from "./styles";

export default function CustomInput() {
  return (
    <>
      <InputContainer>
      <img src="./logo.png" alt="" />
        <Input type="text" placeholder="Buscar" />
      </InputContainer>
    </>
  );
}
