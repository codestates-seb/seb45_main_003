import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { profileTabState } from "../atoms/atoms";
import { useValidateToken } from "../hooks/useValidateToken";
import { useEffect } from "react";
import ProfileTab from "../components/profileTab/profileTab";
import ProfileContent from "../components/profileContent/profileContent";
import AuctionContent from "../components/auctionContent/auctionContent";
import BookmarkContent from "../components/bookmarkContent/bookmarkContent";
import TradeContent from "../components/tradeContent/tradeContent";
import { getAuthToken } from "../util/auth";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = (): JSX.Element => {
  const { validateAccessToken } = useValidateToken();
  const accessToken = getAuthToken();
  const mypageMode = useRecoilValue(profileTabState);
  useEffect(() => {
    validateAccessToken(accessToken);
  }, [mypageMode]);
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
