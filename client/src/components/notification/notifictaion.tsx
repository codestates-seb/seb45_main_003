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
import { getUnReadCount, getNotifications } from "./notificationFunction";
import { useRef } from "react";

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
        color: ${COLOR.darkText};
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
      height: 263px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: stretch;
      font-size: ${FONT_SIZE.font_16};
      overflow: scroll;
      .notification {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid ${COLOR.border};
        padding: 1rem;
        &:last-child {
          border-bottom: none;
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
    }
    notificationMutation.mutateAsync(notification);
  };
  const notificationRef = useRef<HTMLDivElement>(null);
  const getReadCount = useQuery(["readCount", { location }], getUnReadCount);
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
          {getReadCount.isLoading ? null : (
            <div className="readCount">
              {getReadCount.data.unreadNotification !== 0 && getReadCount.data.unreadNotification}
            </div>
          )}
          <NotificationsIcon className="noticiationIcon" />
        </div>
        {open && (
          <ul className="notificationListContainer" onBlur={() => setOpen(!open)}>
            {isLoading ? (
              <Loading />
            ) : (
              notificationInfo?.content.map((el, idx) => (
                <li
                  className={el.isRead ? "isRead notification" : "notRead notification"}
                  key={idx}
                  onClick={() => navigatePost(el)}
                >
                  <div>{el.content}</div>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </Notification>
  );
};

export default Notifications;
