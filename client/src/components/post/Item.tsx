type ItemProps = {
  key: number;
};

const Item = (props: ItemProps): JSX.Element => {
  return <li>{props.key}</li>;
};
export default Item;
