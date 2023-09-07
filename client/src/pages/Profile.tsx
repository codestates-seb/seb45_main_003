import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { loginState, profileTabState } from "../atoms/atoms";
import ProfileTab from "../components/profileTab/profileTab";
import ProfileContent from "../components/profileContent/profileContent";
import AuctionContent from "../components/auctionContent/auctionContent";
import BookmarkContent from "../components/bookmarkContent/bookmarkContent";
import TradeContent from "../components/tradeContent/tradeContent";
// import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = (): JSX.Element => {
  // const navigate = useNavigate();
  const mypageMode = useRecoilValue(profileTabState);
  const isLogin = useRecoilValue(loginState);
  if (!isLogin) {
    console.log(isLogin);
  }
  //refresh 살아있는데 access만료시 login false로 간주중

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
