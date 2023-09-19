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
  @media (max-width: 64rem) {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const Profile = (): JSX.Element => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mypageMode = searchParams.get("menu");
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
