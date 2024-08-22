import React from "react";
import { Background, Container } from "./styles";
import CustomInput from "../CustomInput";

export default function CustomBanner() {
  return (
    <Container>
      <Background>
        <CustomInput />
      </Background>
    </Container>
  );
}
