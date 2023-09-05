import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { profileTabState } from "../atoms/atoms";
import { useValidateToken } from "../hooks/useValidateToken";
import ProfileTab from "../components/profileTab/profileTab";
import ProfileContent from "../components/profileContent/profileContent";
import AuctionContent from "../components/auctionContent/auctionContent";
import BookmarkContent from "../components/bookmarkContent/bookmarkContent";
import TradeContent from "../components/tradeContent/tradeContent";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = (): JSX.Element => {
  useValidateToken();
  const mypageMode = useRecoilValue(profileTabState);

  return (
    <ProfileContainer>
      <ProfileTab />
      {mypageMode === "profile" && <ProfileContent />}
      {mypageMode === "auction" && <AuctionContent />}
      {mypageMode === "bookmark" && <BookmarkContent />}
      {mypageMode === "trade" && <TradeContent />}
    </ProfileContainer>
  );
};
export default Profile;
