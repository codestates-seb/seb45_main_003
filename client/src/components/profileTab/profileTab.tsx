import { useRecoilState } from "recoil";
import { styled } from "styled-components";
import { profileTabState } from "../../atoms/atoms";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { useLocation, useNavigate } from "react-router-dom";

const ProfileTabContainer = styled.ul`
  flex: 0 0 14rem;
  width: 14rem;
  border-radius: 6px;
  border: 1px solid ${COLOR.gray_300};
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  .tabMenu {
    height: 1.25rem;
    font-size: ${FONT_SIZE.font_20};
    padding: 1.25rem 1.5rem;
    &:hover {
      background-color: ${COLOR.primary};
    }
    &.select {
      font-weight: bold;
      background-color: ${COLOR.secondary};
    }
  }
`;

const ProfileTab = (): JSX.Element => {
  const navigate = useNavigate();
  const [tabState, setTabState] = useRecoilState(profileTabState);
  const tabMenu = [
    { value: "profile", text: "프로필" },
    { value: "auction", text: "경매 현황" },
    { value: "bookmark", text: "찜 목록" },
    { value: "purchase", text: "구매내역" },
    { value: "sales", text: "판매내역" },
  ];
  const location = useLocation();
  const handleTab = (value: string): void => {
    setTabState(value);
    navigate(`${location.pathname}?menu=${value}`);
  };
  return (
    <ProfileTabContainer>
      {tabMenu.map((el) => (
        <li
          key={el.value}
          className={tabState === el.value ? "tabMenu select" : "tabMenu"}
          onClick={() => handleTab(el.value)}
        >
          {el.text}
        </li>
      ))}
    </ProfileTabContainer>
  );
};

export default ProfileTab;
