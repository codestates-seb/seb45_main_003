import { StyledMain } from "../../../pages/main/MainStyle";

interface SecondScreenProps {
  text1: string;
  text2: string;
  imgSrc: string;
}

const SecondScreen = ({ text1, text2, imgSrc }: SecondScreenProps): JSX.Element => {
  return (
    <>
      <StyledMain>
        <div className="Function1">
          <div className="TextBox1">
            <div className="Text1">{text1}</div>
            <div className="Text2" dangerouslySetInnerHTML={{ __html: text2 }}></div>
          </div>
          <img className="FunctionImg" src={imgSrc} alt="" />
        </div>
      </StyledMain>
    </>
  );
};

export default SecondScreen;
