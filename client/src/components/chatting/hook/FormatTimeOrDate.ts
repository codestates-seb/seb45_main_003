import moment from "moment-timezone";

const FormatTimeOrDate = (createdAt: string | null) => {
  if (!createdAt) {
    return "";
  }

  const currentTime = moment().tz("Asia/Seoul");
  const messageTime = moment(createdAt).tz("Asia/Seoul"); // 타임존 설정 추가
  const diffInHours = currentTime.diff(messageTime, "hours");

  if (diffInHours < 24) {
    return messageTime.format("a h:mm");
  } else {
    return `${messageTime.format("MM-DD")} ${messageTime.format("a h:mm")}`;
  }
};

export default FormatTimeOrDate;
