interface ButtonProp {
  buttonText: string;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

const Button = ({ buttonText, ...props }: ButtonProp): JSX.Element => {
  return <button {...props}>{buttonText}</button>;
};

export default Button;
