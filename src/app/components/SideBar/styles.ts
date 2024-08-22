import styled from "styled-components";

interface SidebarProps {
  isOpen: boolean;
}

export const SidebarContainer = styled.div<SidebarProps>`
  width: ${(props) => (props.isOpen ? "267px" : "70px")};
  height: 110.125rem;
  background-color: #f46d1b;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  position: absolute;
  transition: width 0.3s ease-in-out;
  z-index: 1000;
`;

export const MenuIcon = styled.div`
  font-size: 2rem;
  cursor: pointer;
  margin-bottom: 20px;
  margin-top: 10px;

  &:hover {
    color: #444;
  }
`;

export const MenuContainer = styled.div`
  display: flex;
  gap: 4rem;
  margin-right: 36px;
`;

export const MenuLinks = styled.div`
  display: flex;
  align-items: baseline;
  flex-direction: column;
  margin-right: 7rem;
  margin-top: 1rem;
  gap: 7px;
  cursor: pointer;
`;

export const TextMenu = styled.div`
  display: flex;
  align-items: center;
  margin-top: 60px;
  margin-left: 30px;
  span {
    font-size: 26px;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export const SidebarContent = styled.div<SidebarProps>`
  width: 100%;
  display: ${(props) => (props.isOpen ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  transition: display 0.3s ease-in-out;
`;

export const SidebarItem = styled.div`
  width: 100%;
  padding: 15px 20px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;
