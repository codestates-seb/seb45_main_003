import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { ReactComponent as EmptyImage } from "../../assets/images/empty.svg";
import Loading from "../../components/common/Loading";
import { API_PATHS } from "../../contstants/path";
import useSSE from "../../hooks/useSSE";
import ErrorIndication from "../../pages/ErrorIndication";
import Item from "./Item";

export type PostType = {
  productId: number;
  memberId: number;
  title: string;
  description: string;
  immediatelyBuyPrice: number;
  productStatus: string;
  views: number;
  action: boolean;
  createAt: string;
  modifiedAt?: string;
  deletedAt?: string;
  closedAt?: string;
};

const List = (): JSX.Element => {
  const { isLoading, error, data } = useQuery<PostType[]>("productData", async () => {
    const response = await axios.get(API_PATHS.products(""), {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    });
    return response.data;
  });
  const queryClient = useQueryClient();

  //Server-Sent-Event 적용
  useSSE({
    url: "/subscribe/products/1",
    callback: (newData: PostType[]) => {
      queryClient.setQueryData("productData", newData);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <ErrorIndication />;
  }

  return (
    <ul>
      {data ? (
        <>
          {data.map((el) => {
            return <Item key={el.productId} data={el} />;
          })}
        </>
      ) : (
        <>
          <EmptyImage />
        </>
      )}
    </ul>
  );
};
export default List;
