import { styled } from "styled-components";
import ProfileTab from "../components/profileTab/profileTab";
import ProfileContent from "../components/profileContent/profileContent";

const ProfileContainer = styled.div`
  padding: 0.75rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = (): JSX.Element => {
  return (
    <ProfileContainer>
      <ProfileTab />
      <ProfileContent />
    </ProfileContainer>
  );
};
export default Profile;
