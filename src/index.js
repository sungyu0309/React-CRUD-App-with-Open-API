import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import { GlobalStyle } from "./styles/GlobalStyle";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { RecoilRoot } from "recoil";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/mypage",
    element: <MyPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <RecoilRoot>
      {/* <React.StrictMode> */}
      <GlobalStyle />
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
      {/* </React.StrictMode> */}
    </RecoilRoot>
  </>
);
