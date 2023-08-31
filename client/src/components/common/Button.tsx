interface ButtonProp {
  type: "button" | "submit" | "reset" | undefined;
  buttonText: string;
  disabled: boolean;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ ...props }: ButtonProp): JSX.Element => {
  return (
    <button {...props} disabled={props.disabled} type={props.type}>
      {props.buttonText}
    </button>
  );
};

export default Button;
