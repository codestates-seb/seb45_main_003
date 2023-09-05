// import ChattingList from "../components/chatting/ChattingList";
import Img1 from "../assets/images/chatting/ProfilrImg.svg";
import ChattingListFrom from "../components/chatting/ChattingListFrom";

const Chatting = (): JSX.Element => {
  return (
    <>
      <h1>Chatting</h1>
      <ChattingListFrom imgSrc={Img1} />
    </>
  );
};

export default Chatting;
