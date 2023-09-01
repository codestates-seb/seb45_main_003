type ButtonProp = {
  type: "button" | "submit" | "reset" | undefined;
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  onSubmit?: () => void;
};

const Button = ({ ...props }: ButtonProp): JSX.Element => {
  return (
    <button {...props} disabled={props.disabled} type={props.type}>
      {props.text}
    </button>
  );
};

export default Button;
