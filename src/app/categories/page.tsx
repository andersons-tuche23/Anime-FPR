"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Sidebar from "../components/SideBar";
import CustomInput from "../components/CustomInput";
import {
  BackgroundColor,
  CategoryTitle,
  FooterPrincipal,
  ImageContainer,
  ImageContent,
  PaginationContainer,
  DivPosition
} from "./styles";
import CustomFooter from "../components/CustomFooter";
import CustomModal from "../components/CustomModal";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import CustomTooltip from "../components/CustomTooltip";

interface Item {
  id: string;
  attributes: Attributes;
}

interface ApiResponse {
  data: Item[];
  links: Links;
}

interface Links {
  first: string;
  next: string;
  last: string;
  prev: string;
}

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

export default function Categories() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchText = searchParams.get("view") || "";
  const [data, setData] = useState<Item[] | null>(null);
  const [links, setLinks] = useState<Links | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTimer, setModalTimer] = useState<NodeJS.Timeout | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const [inputValue, setInputValue] = useState<string>(searchText);

  const fetchData = (url: string) => {
    setIsLoading(true);
    setShowModal(true);

    if (modalTimer) {
      clearTimeout(modalTimer);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        setData(data.data);
        setLinks(data.links);
      })
      .catch((error) => console.error("Error fetching animes:", error))
      .finally(() => {
        setIsLoading(false);
        const timer = setTimeout(() => setShowModal(false), 7000);
        setModalTimer(timer);
      });
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      let url = `https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=20&page[offset]=0`;

      if (searchText) {
        url = `https://kitsu.io/api/edge/anime?filter[text]=${encodeURIComponent(
          searchText
        )}&sort=popularityRank&page[limit]=20&page[offset]=0`;
      }

      fetchData(url);
    }, 700);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [searchText]);

  const handleNextPage = () => {
    if (links?.next) {
      fetchData(links.next);
    }
  };

  const handlePrevPage = () => {
    if (links?.prev) {
      fetchData(links.prev);
    }
  };

  const handleViewAllClick = () => {
    router.push("/categories?view=all");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      router.push(`/categories?view=${encodeURIComponent(inputValue)}`);
    }
  };

  return (
    <DivPosition>
      <Sidebar
        onCategorySelect={(title) => {
          router.push(`/categories?view=${encodeURIComponent(title)}`);
        }}
      />
      <BackgroundColor>
        <ImageContent>
          <img
            src="logoPages.png"
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => router.push("/")}
          />
          <CustomInput
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </ImageContent>
      </BackgroundColor>
     
        <CategoryTitle>
          <img src="/film.png" alt="image_film" />
          <h2>{searchText ? searchText : "Todos os Animes"}</h2>
        </CategoryTitle>
    

      {showModal && isLoading && (
        <CustomModal showModal={showModal} onClose={() => setShowModal(false)}>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <img src="/lee.gif" alt="Loading..." />
          </div>
        </CustomModal>
      )}

      <ImageContainer>
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
                    src={item.attributes.posterImage?.large}
                    alt={item.attributes.canonicalTitle}
                  />
                </Link>
              </div>
            </CustomTooltip>
          ))}
      </ImageContainer>

      <PaginationContainer>
        <button onClick={handlePrevPage} disabled={!links?.prev}>
          <FiArrowLeft size={20} />
        </button>
        <button onClick={handleNextPage} disabled={!links?.next}>
          <FiArrowRight size={20} />
        </button>
      </PaginationContainer>

      <FooterPrincipal>
        <CustomFooter onViewAllClick={handleViewAllClick} />
      </FooterPrincipal>
    </DivPosition>
  );
}
