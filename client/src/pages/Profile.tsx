import { styled } from "styled-components";
import { useRecoilValue } from "recoil";
import { loginState, profileTabState } from "../atoms/atoms";
import { useValidateToken } from "../hooks/useValidateToken";
import { useEffect } from "react";
import ProfileTab from "../components/profileTab/profileTab";
import ProfileContent from "../components/profileContent/profileContent";
import AuctionContent from "../components/auctionContent/auctionContent";
import BookmarkContent from "../components/bookmarkContent/bookmarkContent";
import TradeContent from "../components/tradeContent/tradeContent";
import { useNavigate } from "react-router-dom";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = (): JSX.Element => {
  const { accessToken, validateAccessToken } = useValidateToken();
  const navigate = useNavigate();
  const mypageMode = useRecoilValue(profileTabState);
  const isLogin = useRecoilValue(loginState);
  //refresh 살아있는데 access만료시 login false로 간주중
  useEffect(() => {
    validateAccessToken(accessToken);
    if (!isLogin) {
      alert("토큰이 만료되었습니다.");
      navigate("/login");
    }
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
