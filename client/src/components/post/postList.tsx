import Item from "./Item";

type dataType = {
  id: number;
  title: string;
};

const PostList = (): JSX.Element => {
  const data: dataType[] = [
    {
      id: 1,
      title: "sdr",
    },
  ];

  return (
    <ul>
      {data.map((el) => {
        return <Item key={el.id} />;
      })}
    </ul>
  );
};
export default PostList;
