import styled from "styled-components";

interface CarouselSlideProps {
  isVisible: boolean;
}

interface DotProps {
  isActive: boolean;
}

export const CarouselContainer = styled.div`
  position: relative;
  width: 1208px;
  height: 200px;
  margin: auto;
  overflow: hidden;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`;

export const CarouselSlide = styled.div<CarouselSlideProps>`
  min-width: 100%;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  transition: opacity 0.5s ease-in-out;
  display: ${(props) => (props.isVisible ? "block" : "none")};
`;

export const CarouselImage = styled.img`
  width: 100%;
  display: block;
`;

export const DotContainer = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Dot = styled.div<DotProps>`
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: ${(props) => (props.isActive ? "#fff" : "rgba(255, 255, 255, 0.5)")};
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #fff;
  }
`;
