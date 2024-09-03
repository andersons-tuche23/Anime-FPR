import styled from "styled-components";

export const BackgroundColor = styled.div`
  background-color: black;
`;

export const CategoryTitle = styled.div`
  display: flex;
  gap: 5px;
  margin-left: 9rem;
  align-items: center;
  margin-top: 3rem;

  h2{
    color:#F46D1B ;
    font-size: 22px;
  }

  img{
    width: 22px;
    height: 19px;
  }
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin-left: 5rem;
  margin-top: 1rem;
  perspective: 1000px;

  img {
    width: 225px;
    height: 319px;
    top: 1695px;
    gap: 0px;
    opacity: 0px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
  margin-top: 1rem;

  button {
    background-color: #f46d1b;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 0.5rem;
    margin-left: 1rem;
    color: #fff;
  }

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FooterPrincipal = styled.div`
  margin-top: 8rem;
`;
