import React, { useState, useEffect } from "react";
import { CarouselContainer, CarouselWrapper, CarouselSlide, CarouselImage, DotContainer, Dot } from "./styles";

const images = [
  "./banner4.png",
  "./banner3.png",
  "./banner2.png",
];

export default function CustomCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    }, 3000); 

    return () => clearInterval(interval); 
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <CarouselContainer>
      <CarouselWrapper>
        {images.map((image, index) => (
          <CarouselSlide key={index} isVisible={index === currentIndex}>
            <CarouselImage src={image} alt={`Slide ${index + 1}`} />
          </CarouselSlide>
        ))}
      </CarouselWrapper>
      <DotContainer>
        {images.map((_, index) => (
          <Dot key={index} isActive={index === currentIndex} onClick={() => goToSlide(index)} />
        ))}
      </DotContainer>
    </CarouselContainer>
  );
}
