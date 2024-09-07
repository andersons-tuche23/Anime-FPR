import styled from "styled-components";

export const Footer = styled.div`
  background-image: url(${"./footer.png"});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 18rem;
`;

export const FooterContent = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

img {
    transform: translateY(-29px);
  }
`;

export const TextContainer = styled.div`
margin-top: 10px;
text-align: center;

p{
  color: #fff;
}

span{
  color: #34AC40;
}
`;

export const ButtonFooter = styled.button`
margin-top: 10px;
font-size: 20px;
background-color: #262626;
color: #F46D1B;
border: 3px solid #F46D1B;
cursor: pointer;
padding: 6px 20px;
`;

export const TextFooter = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
align-items: center;

p{
  margin-left: 6rem;
  margin-top: 3rem;
  color: #fff;
}
`;