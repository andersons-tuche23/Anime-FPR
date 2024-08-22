import styled from "styled-components";

export const Input = styled.input`
  width: 230px;
  height: 31px;
  border-radius: 10px;
  opacity: 0px;
  background: transparent;
  border: 2px solid white;
  background-image: url(${"./search.svg"});
  background-repeat: no-repeat;
  background-position: calc(100% - 10px) center;
  background-size: 16px;
  margin-top: 2rem;


  ::placeholder {
    color: red;
  }
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 95%;

  img{
    margin-left: 5rem;
  }
`;





