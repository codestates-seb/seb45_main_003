import { styled } from "styled-components";
import ProfileTab from "../components/profileTab/ProfileTab";
import ProfileContent from "../components/profileContent/ProfileContent";
import AuctionContent from "../components/auctionContent/AuctionContent";
import BookmarkContent from "../components/bookmarkContent/BookmarkContent";
import TradeContent from "../components/tradeContent/TradeContent";
import { useLocation } from "react-router-dom";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: calc(100% - 1.5rem);
  width: 100%;
`;

const Profile = (): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mypageMode = searchParams.get("menu");
  //refresh 살아있는데 access만료시 login false로 간주중
  //거래내역 대신에 판매내역, 그리고 구매내역도 추가해야 함
  return (
    <ProfileContainer>
      <ProfileTab />
      {mypageMode === "profile" && <ProfileContent />}
      {mypageMode === "auction" && <AuctionContent />}
      {mypageMode === "bookmark" && <BookmarkContent />}
      {mypageMode === "purchase" && <TradeContent />}
      {mypageMode === "sales" && <TradeContent />}
    </ProfileContainer>
  );
};
export default Profile;
