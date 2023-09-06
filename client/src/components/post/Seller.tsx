import axios from "axios";
import { useQuery } from "react-query";
import { API_PATHS } from "../../contstants/path";

type SellerProps = {
  memberId: number;
};

const Seller = ({ memberId }: SellerProps): JSX.Element => {
  const { data } = useQuery("seller", async () => {
    const response = await axios.get(API_PATHS.members.default(memberId));
    return response.data;
  });

  //비회원일경우 열람 권한이 없어 수정 요청 해두었음
  console.log(data);

  return <div></div>;
};

export default Seller;
