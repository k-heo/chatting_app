import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/createStore";
import { roomData } from "@/store/slice/Room";

export const getServerSideProps = async (res: any) => {
  const loginChk = res.req.cookies.login;
  if (!loginChk) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return {
    props: {},
  };
};

const Home: NextPage = () => {
  const { isLoginData } = useSelector((state: RootState) => state.Auth);
  const { isRoomData, isRoomUserNames } = useSelector(
    (state: RootState) => state.Room
  );

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (!isLoginData.id) return;
    dispatch(roomData(isLoginData.id, isLoginData.name));
  }, [dispatch, isLoginData]);

  return (
    <>
      <Head>
        <title>Chat List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={"flex flex-col gap-y-2 p-4 w-full h-screen border-gray-200"}
      >
        <span className={"px-4 py-2"}>
          <strong>{isLoginData.name}</strong> is Login
        </span>
        <button
          onClick={() => router.push("/")}
          className={"px-4 py-2 bg-gray-200 rounded-md"}
        >
          Homeに 戻る
        </button>
        <button
          onClick={() => router.push("/user")}
          className={"px-4 py-2 bg-gray-200 rounded-md"}
        >
          User List
        </button>
        <div className={"flex flex-col gap-y-2"}>
          <h1 className={"text-xl"}>My Chat List</h1>
          {isRoomData &&
            isRoomData.map((room, key) => (
              <button
                onClick={() => router.push(`/room/${room.id}`)}
                className={"px-4 py-2 bg-gray-200 rounded-md"}
                key={room.id}
              >
                {isRoomUserNames[key]}会話中 Chat Start
              </button>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
