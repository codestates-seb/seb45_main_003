// 테스트 코드 입니다.
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Logo } from "../../assets/images/Logo.svg";
import { dropDownState } from "../../atoms/atoms";

const StyledHeader = styled.header`
  .header-wrapper {
    padding: 1.25rem;
    width: 100%;
    max-width: 90rem;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: gray;
    position: relative;
  }

  .header-right {
    display: flex;
    gap: 0.75rem;
  }

  .sidebar {
    background: gray;
    max-width: 22rem;
    width: 25%;

    position: absolute;
    top: 4.8125rem;
    right: 0;
  }
`;

const Header = (): JSX.Element => {
  const [dropdown, setDropdown] = useRecoilState(dropDownState);

  const onClickHandler = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <StyledHeader>
        <div className="header-wrapper">
          <Logo />
          <div className="header-right">
            <Link to="/login">로그인</Link>
            <button onClick={onClickHandler}>햄버거</button>
          </div>
          {dropdown && <aside className="sidebar">dropdown</aside>}
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;
