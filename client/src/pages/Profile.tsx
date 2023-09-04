import { styled } from "styled-components";
import ProfileTab from "../components/profileTab/profileTab";

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
    </ProfileContainer>
  );
};
export default Profile;
