/**
 * 基本レイアウト
 * _app.tsxで使う。ページ遷移をしてもこの部分はリロードされない？
 */
import React, { ReactNode, useEffect } from "react";
import Head from "next/head";

// store
import { RootState } from "@/store/createStore";

// redux
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { loginDataCheck } from "@/store/slice/Auth";

interface DeafalutLayoutProps {
  children?: ReactNode;
}

const DefaultLayout = ({ children }: DeafalutLayoutProps): JSX.Element => {
  const { isLogin } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(loginDataCheck());
  }, [dispatch]);

  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <div className={"mainWrap"}>{children}</div>
    </>
  );
};
export default DefaultLayout;
