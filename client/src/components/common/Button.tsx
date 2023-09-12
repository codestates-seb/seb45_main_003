import styled from "styled-components";
import { COLOR } from "../../constants/color";

type ButtonProp = {
  type: "button" | "submit" | "reset" | undefined;
  $size?: string;
  $design?: string;
  $text: string;
  $icon?: JSX.Element;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
};
const StyledButton = styled.button<ButtonProp>`
  display: flex;
  gap: 0.25rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  font-weight: 600;
  transition: 0.3s;
  padding: ${(props) => (props.$size === "big" ? "1.25rem 2.5rem" : "0.5rem 1.25rem")};
  font-size: ${(props) => (props.$size === "big" ? "1.5rem" : ".875rem")};
  background: ${(props) => {
    switch (props.$design) {
      case "black":
        return COLOR.darkText;
      case "yellow":
        return COLOR.primary;
      default:
        return "#fff";
    }
  }};

  color: ${(props) => {
    switch (props.$design) {
      case "black":
        return "#fff";
      default:
        return COLOR.darkText;
    }
  }};

  border: ${(props) => {
    switch (props.$design) {
      case "outline":
        return "1px solid" + COLOR.darkText;
      default:
        return "1px solid transparent";
    }
  }};

  &:hover {
    background: ${(props) => {
      switch (props.$design) {
        case "black":
          return COLOR.primary;
        case "yellow":
          return COLOR.secondary;
        default:
          return "#fff";
      }
    }};

    color: ${(props) => {
      switch (props.$design) {
        case "outline":
          return COLOR.primary;
        case "black":
          return COLOR.darkText;
      }
    }};

    border: ${(props) => {
      switch (props.$design) {
        case "outline":
          return "1px solid" + COLOR.primary;
        default:
          return "1px solid transparent";
      }
    }};
  }
`;

const Button = ({ ...props }: ButtonProp): JSX.Element => {
  return (
    <StyledButton {...props} disabled={props.disabled} type={props.type}>
      {props.$icon}
      {props.$text}
    </StyledButton>
  );
};

export default Button;
