/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ButtonFooter, Footer, FooterContent, TextContainer, TextFooter } from "./styles";
import Link from "next/link";

interface CustomFooterProps {
  onViewAllClick: () => void;
}

export default function CustomFooter({ onViewAllClick }: CustomFooterProps) {
  return (
    <>
      <Footer>
        <FooterContent>
          <img src="./yuzu.png" alt="" />
          <TextContainer>
            <p>Ainda está procurando algo pra assistir?</p>
            <span>Confira o nosso acervo completo</span>
          </TextContainer>
        <Link href="/categories">
            <ButtonFooter onClick={onViewAllClick}>Ver tudo</ButtonFooter>
            </Link>
        </FooterContent>
        <TextFooter>
          <p>© 2024 FPR Animes - Todos os direitos reservados</p>
          <img src="./icon.png" alt="" />
        </TextFooter>
      </Footer>
    </>
  );
}
