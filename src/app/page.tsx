/* eslint-disable @next/next/no-img-element */
"use client";
import { ChangeEvent, useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Background,
  CaroselContainer,
  Container,
  FooterContainer,
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
      if (inputText) {
        router.push(`/categories?view=${encodeURIComponent(inputText)}`);
      }
    }, 700);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [inputText, router]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleViewAllClick = () => {
    console.log("View All button clicked!");
    // Add any additional logic here if needed
  };

  return (
    <Container>
      <Sidebar
        onCategorySelect={function (title: string): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Background>
        <CustomInput value={inputText} onChange={handleInputChange} />
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
                  <img
                    src={item.attributes.posterImage.large}
                    alt={item.attributes.canonicalTitle}
                  />
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
                <img
                  src={item.attributes.posterImage.large}
                  alt={item.attributes.canonicalTitle}
                />
              </div>
            </CustomTooltip>
          ))}
      </ItemContainer>
      <FooterContainer>
        <CustomFooter onViewAllClick={handleViewAllClick} />
      </FooterContainer>
    </Container>
  );
}
