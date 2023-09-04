import { styled } from "styled-components";
import ProfileTab from "../components/profileTab/profileTab";
import ProfileContent from "../components/profileContent/profileContent";
import { useRecoilValue } from "recoil";
import { profileTabState } from "../atoms/atoms";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = (): JSX.Element => {
  const mypageMode = useRecoilValue(profileTabState);
  return (
    <ProfileContainer>
      <ProfileTab />
      {mypageMode === "profile" && <ProfileContent />}
    </ProfileContainer>
  );
};
export default Profile;
