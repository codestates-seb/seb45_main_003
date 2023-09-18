import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { COLOR } from "../../constants/color";
import { FONT_SIZE } from "../../constants/font";
import { authInstance } from "../../interceptors/interceptors";
import Loading from "../common/Loading";
import NotificationsIcon from "@mui/icons-material/Notifications";
import axios from "axios";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../atoms/atoms";
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
      overflow-y: scroll;
      cursor: default;
      .emptymessage {
        padding: 1rem;
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
        &:hover {
          background-color: ${COLOR.gray_300};
        }
        &:last-child {
          border-bottom: none;
        }
        &:first-child {
          border-top: 1px solid ${COLOR.border};
          border-bottom: 1px solid ${COLOR.border};
        }
        &.isRead {
          color: ${COLOR.lightText};
        }
        &.notRead {
          color: ${COLOR.darkText};
        }
      }
      .notificaionContent {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
`;

const Notifications = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const setlogin = useSetRecoilState(loginState);
  const ID = localStorage.getItem("Id");
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const openNotification = () => {
    setOpen(!open);
  };
  const getUnReadCount = async () => {
    try {
      const res = await authInstance.get(`/notifications/count`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          setlogin(false);
        }
      }
    }
  };
  const getNotifications = async () => {
    try {
      const res = await authInstance.get(`/notifications`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.log(error);
        }
      }
    }
  };
  const removeReadNotifications = async () => {
    try {
      const res = await authInstance.delete(`/notifications/delete`);
      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
      }
    }
  };
  const {
    isLoading,
    data: notificationInfo,
    refetch,
  } = useQuery<notificationData>(["notification", { location }], getNotifications, {
    staleTime: 30000,
  });
  const notificationMutation = useMutation(
    async (notification: notification) => {
      await authInstance.patch(`/notifications/${notification.notificationId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["notification"]);
        queryClient.invalidateQueries(["readCount"]);
      },
    },
  );
  const navigatePost = async (notification: notification) => {
    if (notification.notificationType === "REVIEW") {
      const path = `/member/${ID}?menu=profile&tabmenu=getReview&page=1`;
      navigate(path);
    } else if (notification.notificationType === "PRODUCT") {
      if (notification.categoryId !== null) {
        navigate(`/product/${notification.referenceId}`);
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
      refetch();
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
                        <div className="notificaionContent">{el.content}</div>
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
