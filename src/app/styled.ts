import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
position: relative;
`;
export const Background = styled.div`
  background-image: url(${"./banner.png"});
  background-repeat: no-repeat;
  height: 29rem;
  background-size: cover;
  width: 100%;
`;

export const ImageContent = styled.div`
display: flex;
justify-content: space-between;
width: 95%;

img{
  margin-left: 5rem;
}
`;


export const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;

  img {
    width: 226px;
    height: 319px;
    cursor: pointer;
  }
`;

export const SubTitle = styled.h1`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-left: 10.5rem;
  gap: 5px;
  margin-top: 40px;

  .first {
    color: #f46d1b;
  }

  .second {
    color: #34ac40;
  }
`;

export const SubTitleFooter = styled.h2`
  font-size: 2rem;
  display: flex;
  align-items: center;
  margin-left: 11rem;
  gap: 5px;
  margin-top: 40px;

  .first {
    color: #f46d1b;
  }

  .second {
    color: #34ac40;
  }
`;

export const CaroselContainer = styled.div`
  margin-top: 4rem;
`;

export const FooterContainer = styled.div`
margin-top: 5rem;
`;
