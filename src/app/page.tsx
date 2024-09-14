/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Background,
  CaroselContainer,
  Container,
  FooterContainer,
  ImageContent,
  ItemContainer,
  SubTitle,
  SubTitleFooter,
} from "./styled";
import Sidebar from "./components/SideBar";
import CustomCarousel from "./components/CustomCarousel";
import { FaThumbsUp } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import CustomFooter from "./components/CustomFooter";
import CustomTooltip from "./components/CustomTooltip";
import CustomInput from "./components/CustomInput";
import Link from "next/link";

interface PosterImage {
  large: string;
}

interface Attributes {
  posterImage: PosterImage;
  canonicalTitle: string;
  popularityRank: number;
  ratingRank: number;
  averageRating: number;
  synopsis: string;
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
  const [topRatedData, setTopRatedData] = useState<Item[] | null>(null);
  const [inputText, setInputText] = useState("");
  const [searchText, setSearchText] = useState("");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(
      "https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-popularityRank,popularityRank"
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => setData(data.data))
      .catch((error) => console.error("Error fetching data:", error));

    fetch(
      "https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&sort=-average_rating"
    )
      .then((response) => response.json())
      .then((data: ApiResponse) => setTopRatedData(data.data))
      .catch((error) =>
        console.error("Error fetching top-rated animes:", error)
      );
  }, []);

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchText(inputText);
    }, 700);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputText]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText(inputText);
      router.push(`/categories?view=${encodeURIComponent(inputText)}`);
    }
  };

  const handleCategorySelect = (title: string) => {
    router.push(`/categories?view=${encodeURIComponent(title)}`);
  };

  return (
    <Container>
      <Sidebar onCategorySelect={handleCategorySelect} />
      <Background>
        <ImageContent>
          <img src="./logo.png" alt="" />
          <CustomInput
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </ImageContent>
      </Background>
      <SubTitle>
        <CiStar style={{ color: "#F46D1B" }} />
        <span className="first">Animes</span>{" "}
        <span className="second">Mais Populares</span>
      </SubTitle>
      <div>
        <ItemContainer>
          {data &&
            data.map((item) => (
              <CustomTooltip
                key={item.id}
                text={item.attributes.canonicalTitle}
                rank={item.attributes.popularityRank}
                ratingRank={item.attributes.ratingRank}
                popularityRank={item.attributes.popularityRank}
                averageRating={item.attributes.averageRating}
                synopsis={item.attributes.synopsis}
              >
                <div>
                  <Link href={`/sinopes?animeId=${item.id}`} passHref>
                  <img
                    src={item.attributes.posterImage.large}
                    alt={item.attributes.canonicalTitle}
                  />
                  </Link>
                </div>
              </CustomTooltip>
            ))}
        </ItemContainer>
      </div>
      <CaroselContainer>
        <CustomCarousel />
      </CaroselContainer>
      <SubTitleFooter>
        <FaThumbsUp style={{ color: "#F46D1B" }} />
        <span className="first">Animes</span>{" "}
        <span className="second">Mais Bem Classificados</span>
      </SubTitleFooter>

      <ItemContainer>
        {topRatedData &&
          topRatedData.map((item) => (
            <CustomTooltip
              key={item.id}
              text={item.attributes.canonicalTitle}
              rank={item.attributes.popularityRank}
              ratingRank={item.attributes.ratingRank}
              popularityRank={item.attributes.popularityRank}
              averageRating={item.attributes.averageRating}
              synopsis={item.attributes.synopsis}
            >
              <div>
                <Link href={`/sinopes?animeId=${item.id}`} passHref>
                <img
                  src={item.attributes.posterImage.large}
                  alt={item.attributes.canonicalTitle}
                />
                </Link>
              </div>
            </CustomTooltip>
          ))}
      </ItemContainer>
      <FooterContainer>
        <CustomFooter onViewAllClick={()=>{}} />
      </FooterContainer>
    </Container>
  );
}
