import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { COLOR } from "../../constants/color";
import MobileSidebar from "./MobileSidebar";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 1rem 0;
  border-bottom: 1px solid ${COLOR.border};

  .logo {
    max-width: 7.125rem;
    max-height: 1.125rem;
    margin: 0 auto;
  }

  .menu_icon {
    position: absolute;
    top: 50%;
    transform: translatey(-50%);
    right: 1rem;
  }

  button {
    background: none;
    border: none;
    padding: 0;
    display: flex;
  }
`;

const MobileHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <StyledHeader>
      <Logo className="logo" />
      <button>
        <MenuIcon
          className="menu_icon"
          onClick={() => {
            setIsOpen(true);
          }}
        />
      </button>
      {isOpen && <MobileSidebar onClose={setIsOpen} />}
    </StyledHeader>
  );
};

export default MobileHeader;
