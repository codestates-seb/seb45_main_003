import { useRecoilState } from "recoil";
import { profileTabState } from "../../atoms/atoms";
import { styled } from "styled-components";
import { COLOR } from "../../contstants/color";
import { FONT_SIZE } from "../../contstants/font";

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
  const [tabState, setTabState] = useRecoilState(profileTabState);
  const tabMenu = [
    { value: "profile", text: "프로필" },
    { value: "auction", text: "경매 현황" },
    { value: "bookmark", text: "찜 목록" },
    { value: "trade", text: "거래내역" },
  ];

  return (
    <ProfileTabContainer>
      {tabMenu.map((el) => (
        <li
          key={el.value}
          className={tabState === el.value ? "tabMenu select" : "tabMenu"}
          onClick={() => setTabState(el.value)}
        >
          {el.text}
        </li>
      ))}
    </ProfileTabContainer>
  );
};

export default ProfileTab;
