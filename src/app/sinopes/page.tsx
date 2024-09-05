"use client";

import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Sidebar from "../components/SideBar";
import CustomInput from "../components/CustomInput";
import {
  AproveText,
  BackTransparent,
  ButtonContainer,
  ButtonContent,
  HeartImage,
  ImageContent,
  StarImage,
  AnimeDetails,
  TubeButton,
  Container,
  FooterContainer,
} from "./styles";
import CustomFooter from "../components/CustomFooter";
import CustomModal from "../components/CustomModal";

export default function Sinopes() {
  const [showModal, setShowModal] = useState(false);
  const [youtubeVideoId, setYoutubeVideoId] = useState<string | null>(null);
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [synopsis, setSynopsis] = useState<string>("");
  const [largeImage, setLargeImage] = useState<string | null>(null);
  const [titles, setTitles] = useState<{ [key: string]: string }>({});
  const [posterImage, setPosterImage] = useState<string | null>(null);
  const [canonicalTitle, setCanonicalTitle] = useState<string>("");
  const [averageRating, setAverageRating] = useState<string | null>(null);
  const [ratingRank, setRatingRank] = useState<string | null>(null);
  const [popularityRank, setPopularityRank] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const animeId = searchParams.get("animeId");
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (animeId) {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://kitsu.io/api/edge/anime/${animeId}`
          );
          const data = await response.json();

          if (data.data) {
            const anime = data.data.attributes;
            setYoutubeVideoId(anime.youtubeVideoId);
            setBannerImage(anime.coverImage?.tiny);
            setPosterImage(anime.posterImage?.small);
            setLargeImage(anime.coverImage?.large);
            setDescription(anime.description);
            setSynopsis(anime.synopsis);
            setTitles(anime.titles);
            setCanonicalTitle(anime.canonicalTitle);
            setAverageRating(anime.averageRating);
            setRatingRank(anime.ratingRank);
            setPopularityRank(anime.popularityRank);
          }
        } catch (error) {
          console.error("Erro ao buscar os dados:", error);
        }
      };

      fetchData();
    }
  }, [animeId]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchText(search);
      router.push(`/categories?view=${encodeURIComponent(search)}`);
    }
  };

  useEffect(() => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      setSearchText(search);
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [search]);

  const handleCategorySelect = (title: string) => {
    router.push(`/categories?view=${encodeURIComponent(title)}`);
  };

  return (
    <>
      <Container>
        <BackTransparent>
          <Sidebar onCategorySelect={handleCategorySelect} />
          <ImageContent>
            <img
              src="logoPages.png"
              alt=""
              style={{ cursor: "pointer" }}
              onClick={() => router.push("/")}
            />
            <CustomInput
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </ImageContent>
          {bannerImage && (
            <img
              src={bannerImage}
              alt="Anime Banner"
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
            />
          )}
        </BackTransparent>
        <div>
          <AnimeDetails>
            <ButtonContainer>
              {posterImage && (
                <img
                  src={posterImage}
                  alt="Anime Poster Large"
                  style={{
                    width: "221px",
                    height: "313px",
                    objectFit: "cover",
                  }}
                />
              )}
              <TubeButton onClick={handleOpenModal}>
                <ButtonContent>
                  <img src="/button.png" alt="" />
                  VER TRAILER
                </ButtonContent>
              </TubeButton>
              <AproveText>Aprovado {averageRating}% da comunidade</AproveText>
              <HeartImage>
                <img src="/heart.png" alt="" />
                <p>#{popularityRank} Mais Popular</p>
              </HeartImage>
              <StarImage>
                <img src="/star.png" alt="" />
                <p>#{ratingRank} Melhor classificado</p>
              </StarImage>
            </ButtonContainer>
            {showModal && youtubeVideoId && (
              <CustomModal showModal={showModal} onClose={handleCloseModal}>
                <iframe
                  width="800"
                  height="450"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                  title="YouTube Video"
                ></iframe>
              </CustomModal>
            )}
            <div>
              <h1>{canonicalTitle}</h1>
              <p style={{ width: "855px", height: "50px" }}>{synopsis}</p>
            </div>
          </AnimeDetails>
          <FooterContainer>
            <CustomFooter onViewAllClick={() => {}} />
          </FooterContainer>
        </div>
      </Container>
    </>
  );
}
