import { useMutation, useQuery, useQueryClient } from "react-query";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { authInstance } from "../../interceptors/interceptors";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import ErrorIndication from "../../pages/ErrorIndication";
import Loading from "../common/Loading";
import { useRecoilState } from "recoil";
import { profileTabState } from "../../atoms/atoms";
import { postListTabState } from "../../atoms/atoms";
import { findCategory } from "../../util/category";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { getUnReadCount, getNotifications, removeReadNotifications } from "./notificationFunction";
import { useRef } from "react";
import Button from "../common/Button";

interface notificationData {
  content: notification[];
  totalPages: number;
}

interface notification {
  notificationId: number;
  content: string;
  notificationType: string;
  createdAt: string;
  isRead: boolean;
  referenceId: number;
  categoryId: number | null;
}

const Notification = styled.div`
  .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    position: relative;
    .iconContainer {
      display: flex;
      flex-direction: row;
      align-items: flex-end;
      .readCount {
        font-size: ${FONT_SIZE.font_20};
        font-weight: bold;
        color: ${COLOR.primary};
      }
    }
    .notificationListContainer {
      position: absolute;
      top: 40px;
      left: -200px;
      z-index: 99;
      border: 1px solid ${COLOR.border};
      background-color: ${COLOR.gray_100};
      border-radius: 6px;
      width: 18.75rem;
      height: 13rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      font-size: ${FONT_SIZE.font_16};
      overflow: scroll;
      cursor: default;
      .emptymessage {
        color: ${COLOR.darkText};
      }
      .deleteButtonContainer {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        gap: 1rem;
        color: ${COLOR.darkText};
        font-weight: bold;
        font-size: ${FONT_SIZE.font_20};
      }
      .notification {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid ${COLOR.border};
        padding: 1rem;
        cursor: pointer;
        &:last-child {
          border-bottom: none;
        }
        &:first-child {
          border-top: 1px solid ${COLOR.border};
          border-bottom: 1px solid ${COLOR.border};
        }
        &.isRead {
          color: ${COLOR.mediumText};
        }
        &.notRead {
          color: ${COLOR.darkText};
        }
      }
    }
  }
`;

const Notifications = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [tabState, setTabState] = useRecoilState(profileTabState);
  const [menu, setMenu] = useRecoilState(postListTabState);
  const ID = localStorage.getItem("Id");
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const openNotification = () => {
    setOpen(!open);
  };
  const { isLoading, data: notificationInfo } = useQuery<notificationData>(
    ["notification"],
    getNotifications,
    {
      staleTime: 30000,
    },
  );
  const notificationMutation = useMutation(
    async (notification: notification) => {
      await authInstance.patch(`/notifications/${notification.notificationId}`);
    },
    {
      onSuccess: () => queryClient.invalidateQueries("notification"),
    },
  );
  const navigatePost = async (notification: notification) => {
    if (notification.notificationType === "REVIEW") {
      setTabState("profile");
      setMenu("getReview");
      const path = `/member/${ID}?menu=${tabState}&tabmenu=${menu}&page=1`;
      console.log(path);
      navigate(path);
    } else if (notification.notificationType === "PRODUCT") {
      if (notification.categoryId !== null) {
        navigate(`/product/${findCategory(notification.categoryId)}/${notification.referenceId}`);
      }
    } else if (notification.notificationType === "CHAT") {
      navigate(`/chat/${ID}`);
    }
    notificationMutation.mutateAsync(notification);
  };
  const notificationRef = useRef<HTMLDivElement>(null);
  const getReadCount = useQuery(["readCount", { location }], getUnReadCount);
  const notificationsMutation = useMutation(removeReadNotifications, {
    onSuccess: () => {
      queryClient.invalidateQueries("notificaion");
    },
  });
  const handleDelete = async () => {
    notificationsMutation.mutateAsync();
  };
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationRef]);
  // if (getReadCount.isError) {
  //   return <ErrorIndication error={Error} />;
  // }
  return (
    <Notification ref={notificationRef}>
      <div className="icon">
        <div className="iconContainer" onClick={openNotification}>
          {getReadCount.isLoading || getReadCount.isError ? null : (
            <div className="readCount">
              {getReadCount.data &&
                getReadCount.data.unreadNotification !== 0 &&
                getReadCount.data.unreadNotification}
            </div>
          )}
          <NotificationsIcon className="noticiationIcon" />
        </div>
        {open && (
          <div className="notificationListContainer">
            {notificationInfo?.content.length === 0 ? (
              <div className="emptymessage">도착한 알림이 없습니다.</div>
            ) : (
              <>
                <div className="deleteButtonContainer">
                  <div className="containerTitle">알림 보관함</div>
                  <Button
                    type="button"
                    $text="읽은 알림 지우기"
                    $design="black"
                    onClick={() => handleDelete()}
                  />
                </div>
                <ul className="notificationContainer">
                  {isLoading && <Loading />}
                  {notificationInfo?.content.length !== 0 &&
                    notificationInfo?.content.map((el, idx) => (
                      <li
                        className={el.isRead ? "isRead notification" : "notRead notification"}
                        key={idx}
                        onClick={() => navigatePost(el)}
                      >
                        <div>{el.content}</div>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>
    </Notification>
  );
};

export default Notifications;
