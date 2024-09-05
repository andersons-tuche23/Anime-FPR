import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import {
  SidebarContainer,
  MenuIcon,
  SidebarContent,
  MenuContainer,
  TextMenu,
  MenuLinks,
  StyledFaTimes,
} from "./styles";

interface Category {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
    posterImage: {
      tiny: string;
      large: string;
    };
  };
}

interface ApiResponse<T> {
  data: T[];
}

interface SidebarProps {
  onCategorySelect: (title: string) => void;
}

export default function Sidebar({ onCategorySelect }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetch("https://kitsu.io/api/edge/categories?page%5Blimit%5D=40&sort=-total_media_count")
      .then((response) => response.json())
      .then((data: ApiResponse<Category>) => setCategories(data.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleCategoryClick = (categoryId: string, categoryTitle: string) => {
    onCategorySelect(categoryTitle);
    setIsOpen(false);
  };

  return (
    <SidebarContainer ref={sidebarRef} isOpen={isOpen}>
      {!isOpen ? (
        <MenuIcon onClick={toggleSidebar}>
          <FaBars />
        </MenuIcon>
      ) : (
        <MenuContainer>
          <TextMenu>
            <TfiMenuAlt style={{ height: "25px", width: "30px" }} />
            <span>Categorias</span>
          </TextMenu>
          <StyledFaTimes onClick={toggleSidebar} />
        </MenuContainer>
      )}
      <SidebarContent isOpen={isOpen}>
        <MenuLinks>
          {categories &&
            categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id, category.attributes.title)}
              >
                <p>{category.attributes.title}</p>
              </div>
            ))}
        </MenuLinks>
      </SidebarContent>
    </SidebarContainer>
  );
}
