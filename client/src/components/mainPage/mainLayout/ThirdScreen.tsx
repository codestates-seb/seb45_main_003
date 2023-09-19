import { StyledMain } from "../../../pages/main/MainStyle";

interface ThirdScreenProps {
  text1: string;
  text2: string;
  imgSrc: string;
}

const ThirdScreen = ({ text1, text2, imgSrc }: ThirdScreenProps): JSX.Element => {
  return (
    <>
      <StyledMain>
        <div className="Function1 reverse" data-aos="fade-left" data-aos-duration="1200">
          <img className="FunctionImg" src={imgSrc} alt="" />
          <div className="TextBox1">
            <div className="Text1">{text1}</div>
            <div className="Text2" dangerouslySetInnerHTML={{ __html: text2 }}></div>
          </div>
        </div>
      </StyledMain>
    </>
  );
};

export default ThirdScreen;
