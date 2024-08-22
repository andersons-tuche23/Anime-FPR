"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/SideBar";
import CustomInput from "../components/CustomInput";
import {
  BackgroundColor,
  FooterPrincipal,
  ImageContainer,
  PaginationContainer,
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
  const [data, setData] = useState<Item[] | null>(null);
  const [links, setLinks] = useState<Links | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalTimer, setModalTimer] = useState<NodeJS.Timeout | null>(null);

  const fetchData = (url: string) => {
    setIsLoading(true);
    setShowModal(true);

    if (modalTimer) {
      clearTimeout(modalTimer);
    }

    fetch(url)
      .then((response) => response.json())
      .then((data: ApiResponse) => {
        console.log('Fetched Data:', data); 
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
    fetchData(
      `https://kitsu.io/api/edge/anime?filter[categories]=&sort=popularityRank&page[limit]=20&page[offset]=0`
    );
  }, []);

  const handleNextPage = () => {
    if (links?.next) {
      fetchData(links.next);
    }
  };

  const handlePrevPage = () => {
    if (links?.first) {
      fetchData(links.first);
    }
  };

  return (
    <>
      <Sidebar />
      <BackgroundColor>
        <CustomInput />
      </BackgroundColor>

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
                    src={item.attributes.posterImage.large}
                    alt={item.attributes.canonicalTitle}
                  />
                </Link>
              </div>
            </CustomTooltip>
          ))}
      </ImageContainer>

      <PaginationContainer>
        <button onClick={handlePrevPage} disabled={!links?.first}>
          <FiArrowLeft size={20} />
        </button>
        <button onClick={handleNextPage} disabled={!links?.next}>
          <FiArrowRight size={20} />
        </button>
      </PaginationContainer>

      <FooterPrincipal>
        <CustomFooter />
      </FooterPrincipal>
    </>
  );
}
