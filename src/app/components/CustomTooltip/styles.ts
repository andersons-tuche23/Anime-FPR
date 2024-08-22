import styled from "styled-components";

export const TooltipWrapper = styled.div`
  display: inline-block;
  position: relative;
`;

export const Tooltip = styled.div`
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #262626;
  color: #fff;
  padding: 8px;
  border-radius: 10px;
  white-space: normal;
  font-size: 14px;
  z-index: 1000;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
  width: 226px;
  height: 252px;
  display: flex;
  flex-direction: column;

  ${TooltipWrapper}:hover & {
    opacity: 1;
  }

  &::after {
    content: "";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 10px;
    border-style: solid;
    border-color: transparent transparent #333 transparent;
  }
`;

export const Tittle = styled.span`
margin-top: 10px;
  font-size: 20px;
  color: #cccccc;
  font-weight: 600;
`;

export const Classification = styled.span`
  margin-top: 7px;
  font-size: 20px;
  font-weight: 500;
  color: #16a085;
`;

export const HeartText = styled.p`
  margin-top: 7px;
  font-size: 14px;
  font-weight: 500;
  color: #cccccc;
`;

export const StarText = styled.p`
  margin-top: 7px;
  font-size: 14px;
  font-weight: 500;
  color: #cccccc;
`;

export const Icon = styled.span`
  margin-right: 4px;
  font-size: 16px;
`;

export const Sinops = styled.span`
  margin-top: 15px;
  font-size: 12px;
  font-weight: 400;
  display: block;
  max-height: 72px;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  color: #cccccc;

  &::after {
    content: "...";
    display: block;
    position: absolute;
    bottom: 0;
    right: 0;
    background: #262626;
    padding-left: 4px;
    color: #fff;
  }
`;
