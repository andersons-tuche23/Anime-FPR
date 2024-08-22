import React, { useEffect, useRef, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { SidebarContainer, MenuIcon, SidebarContent, MenuContainer, TextMenu, MenuLinks } from "./styles";

interface Category {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
  };
}

interface Anime {
  id: string;
  type: string;
  attributes: {
    title: string;
    description: string;
  };
}

interface ApiResponse<T> {
  data: T[];
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [animes, setAnimes] = useState<Anime[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  const handleCategoryClick = (categoryId: string) => {
    console.log("Categoria ", categoryId);
    setSelectedCategory(categoryId);
    fetch(`https://kitsu.io/api/edge/anime?filter[categories]=${categoryId}`)
      .then((response) => response.json())
      .then((data: ApiResponse<Anime>) => setAnimes(data.data))
      .catch((error) => console.error("Error fetching animes:", error));
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
            <TfiMenuAlt style={{ height: '25px', width: '30px' }} />
            <span>Categorias</span>
          </TextMenu>
          <FaTimes onClick={toggleSidebar} />
        </MenuContainer>
      )}
      <SidebarContent isOpen={isOpen}>
        <MenuLinks>
          {categories &&
            categories.map((category) => (
              <div key={category.id} onClick={() => handleCategoryClick(category.id)}>
                <p>{category.attributes.title}</p>
              </div>
            ))}
        </MenuLinks>
      </SidebarContent>
    </SidebarContainer>
  );
}
