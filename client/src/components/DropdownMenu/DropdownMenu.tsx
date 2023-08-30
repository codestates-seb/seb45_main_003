import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { ReactComponent as Hamburger } from "../../assets/images/Hamburger.svg";
import MenuItem from "./MeunItem";

const HamburgerButton = styled.button`
  cursor: pointer;
  background: none;
  border: none;
  padding: 0;
  margin: 0;
`;

const DropdownMenuContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: start;

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  ul li {
    padding: 0.5rem;
  }

  ul li a {
    text-decoration: none;
  }
`;

const DropdownMenu: React.FC = () => {
  return (
    <DropdownMenuContainer>
      <ul>
        <li>
          <a href="#item1">
            <MenuItem />
          </a>
        </li>
        <li>
          <a href="#item2">
            <MenuItem />
          </a>
        </li>
        <li>
          <a href="#item3">
            <MenuItem />
          </a>
        </li>
      </ul>
    </DropdownMenuContainer>
  );
};

const DropdownMenuButton: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null); // 타입을 HTMLDivElement로 지정

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={menuRef}>
      <HamburgerButton onClick={toggleMenu}>
        <Hamburger />
      </HamburgerButton>
      {showMenu && <DropdownMenu />}
    </div>
  );
};

export default DropdownMenuButton;
