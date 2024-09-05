import styled from "styled-components";

export const Container = styled.div`
position: relative;
`;

export const BackTransparent = styled.div`
  background: #000000cc;
  height: 102px;
`;

export const ImageContent = styled.div`
display: flex;
justify-content: space-between;
width: 95%;

img{
  margin-left: 5rem;
}
`;

export const TubeButton = styled.button`
  width: 221px;
  height: 49px;
  border-radius: 8px;
  background-color: #f46d1b;
  color: #fff;
  cursor: pointer;
  border: none;
`;

export const AnimeDetails = styled.div`
  display: flex;
  align-items: center;
  margin-top: 12rem;
  gap: 2rem;
  margin-left: 12rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-weight: bold;
  font-size: 16px;
`;

export const AproveText = styled.p`
color: #16A085;
font-size: 16px;
font-weight: 500;
`;

export const HeartImage = styled.div`
  display: flex;
  gap: 3px;

  p{
    font-size: 16px;
    font-weight: 500;
  }
`;

export const StarImage = styled.div`
display: flex;
gap: 3px;

p{
  font-size: 16px;
  font-weight: 500;
}
`;

export const FooterContainer = styled.div`
margin-top: 10rem;
`;
