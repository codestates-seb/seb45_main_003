import type { RouteObject } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Chatting from "./pages/Chatting";
import CreatePost from "./pages/CreatePost";
import ErrorIndication from "./pages/ErrorIndication";
import LogIn from "./pages/LogIn";
import Main from "./pages/main/Main";
import PostInformation from "./pages/PostInformation";
import PostsList from "./pages/PostsList";
import Profile from "./pages/Profile";
import Review from "./pages/Review";
import Root from "./pages/Root";

function App() {
  const routes: RouteObject[] = [
    // 1) 메인 홈 페이지
    // {
    //   path: "/",
    //   element: <Main />,
    // },
    {
      // Root Layout
      path: "/",
      element: <Root />,
      children: [
        // // 1) 메인 홈 페이지
        {
          path: "/",
          element: <Main />,
        },

        // 2) 로그인 페이지
        {
          path: "/login",
          element: <LogIn />,
        },

        // 3) 프로필 페이지
        {
          path: "/member/:id",
          element: <Profile />,
        },

        // 4) 게시물 작성
        {
          path: "/create-post",
          element: <CreatePost />,
        },

        // 5) 게시물 리스트 페이지
        {
          path: "/product",
          element: <PostsList />,
        },

        // 6) 게시글 상세 페이지
        {
          path: "/product/:item",
          element: <PostInformation />,
        },

        // 7) 채팅 페이지
        {
          path: "/chat/:id",
          element: <Chatting />,
        },

        // 8) 후기,리뷰 페이지
        {
          path: "/review/:id",
          element: <Review />,
        },

        // 9) 에러 페이지
        {
          path: "*",
          element: <ErrorIndication />,
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
