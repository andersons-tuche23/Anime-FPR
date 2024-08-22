import React from "react";
import { ButtonFooter, Footer, FooterContent, TextContainer, TextFooter } from "./styles";
import Link from "next/link";

export default function CustomFooter() {
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
              <ButtonFooter>Ver tudo</ButtonFooter>
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
