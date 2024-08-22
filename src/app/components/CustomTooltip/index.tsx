import React, { useState, ReactNode } from "react";
import { Tooltip, TooltipWrapper, Icon, Sinops, Tittle, Classification, HeartText, StarText } from "./styles";

interface CustomTooltipProps {
  text: string;
  children: ReactNode;
  rank: number;
  ratingRank?: number;
  popularityRank?: number;
  averageRating: number;
  synopsis: string;
}

export default function CustomTooltip({
  text,
  children,
  ratingRank,
  popularityRank,
  averageRating,
  synopsis
}: CustomTooltipProps) {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <TooltipWrapper onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && (
        <Tooltip>
          <Tittle>{` ${text}`}</Tittle>
          {averageRating !== undefined && (
            <Classification>
              {`${averageRating}%`}
            </Classification>
          )}
          {popularityRank !== undefined && (
           <div>
           <HeartText>
             <Icon role="img" aria-label="heart">❤️</Icon>
             {`#${popularityRank} Mais Popular`}
           </HeartText>
         </div>
          )}
          {ratingRank !== undefined && (
            <div>
              <StarText>
              <Icon role="img" aria-label="star">⭐</Icon>
              {`#${ratingRank} Melhor Classificado`}
              </StarText>
            </div>
          )}
         {synopsis && <Sinops>{synopsis}</Sinops>}
        </Tooltip>
      )}
    </TooltipWrapper>
  );
}
