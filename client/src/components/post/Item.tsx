type ItemProps = {
  data: {
    productId: number;
  };
};

const Item = (props: ItemProps): JSX.Element => {
  const { data } = props;
  return <li>{data.productId}</li>;
};
export default Item;
