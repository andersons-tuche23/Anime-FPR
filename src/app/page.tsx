/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import {
  CaroselContainer,
  Container,
  FooterContainer,
  ItemContainer,
  SubTitle,
  SubTitleFooter,
} from "./styled";
import Sidebar from "./components/SideBar";
import CustomBanner from "./components/CustomBanner";
import CustomCarousel from "./components/CustomCarousel";
import { FaThumbsUp } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import CustomFooter from "./components/CustomFooter";

interface PosterImage {
  large: string;
}

interface Attributes {
  posterImage: PosterImage;
  canonicalTitle: string;
}

interface Item {
  id: string;
  attributes: Attributes;
}

interface ApiResponse {
  data: Item[];
}

export default function Home() {
  const [data, setData] = useState<Item[] | null>(null);
  const [topRatedData, setTopRatedData] = useState<Item[] | null>(null)

  useEffect(() => {
    fetch(
      "https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-popularityRank,popularityRank"
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));

      fetch("https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-average_rating")
      .then((response) => response.json())
      .then((data: ApiResponse) => setTopRatedData(data.data))
      .catch((error) => console.error("Error fetching top-rated animes:", error));
  }, []);

  return (
    <Container>
      <Sidebar />
      <CustomBanner />
      <SubTitle>
        <CiStar style={{ color: ' #F46D1B' }} />
        <span className="first">Animes</span>{" "}
        <span className="second">Mais Populares</span>
      </SubTitle>
      <div>
        <ItemContainer>
          {data &&
            data.map((item) => (
              <div key={item.id}>
                <img
                  src={item.attributes.posterImage.large}
                  alt={item.attributes.canonicalTitle}
                />
              </div>
            ))}
        </ItemContainer>
      </div>
      <CaroselContainer>
        <CustomCarousel />
      </CaroselContainer>
      <SubTitleFooter>
        <FaThumbsUp style={{ color: ' #F46D1B' }} />
        <span className="first">Animes</span>{" "}
        <span className="second">Mais Bem Classificados</span>
      </SubTitleFooter>

        <ItemContainer>
          {topRatedData &&
            topRatedData.map((item) => (
              <div key={item.id}>
                <img
                  src={item.attributes.posterImage.large}
                  alt={item.attributes.canonicalTitle}
                />
              </div>
            ))}
        </ItemContainer>
        <FooterContainer>
      <CustomFooter/>
      </FooterContainer>
    </Container>
  );
}
