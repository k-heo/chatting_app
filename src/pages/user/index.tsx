import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/createStore";
import { peopleData } from "@/store/slice/People";
import { createRoom } from "@/store/slice/Room";
import { useRouter } from "next/router";

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
  const { isLogin, isLoginData } = useSelector(
    (state: RootState) => state.Auth
  );
  const { isPeopleData } = useSelector((state: RootState) => state.People);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(peopleData());
  }, [dispatch, isLogin, router]);

  async function handleRoomCreate(otherPeopleId: string) {
    // create room
    createRoom(isLoginData.id, otherPeopleId);
  }

  return (
    <>
      <Head>
        <title>User List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={"flex flex-col gap-y-2 p-4 w-full h-screen border-gray-200"}
      >
        <button
          onClick={() => router.push("/chat")}
          className={"px-4 py-2 bg-gray-200 rounded-md"}
        >
          ChatListに戻る
        </button>
        <div className={"flex flex-col gap-y-2"}>
          <h1 className={"text-xl"}>User List</h1>
          {isPeopleData &&
            isPeopleData.map((people, key) => {
              return (
                <div key={key}>
                  <button onClick={() => handleRoomCreate(people.id)}>
                    <div>{people.name}</div>
                  </button>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
};

export default Home;
