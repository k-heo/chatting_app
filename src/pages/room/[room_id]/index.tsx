import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import io from "socket.io-client";
import { RootState } from "@/store/createStore";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";

interface IMsg {
  id: string;
  room_id: string;
  user_id: string;
  message: string;
  createdAt: string;
  user: UserName;
}

interface UserName {
  name: string;
}

interface IProps {
  room_id?: string;
  msg: IMsg[];
}

export const getServerSideProps: GetServerSideProps<IProps> = async (ctx) => {
  const room_id = String(ctx.query.room_id);
  const userId = ctx.req.cookies.user;
  const loginChk = ctx.req.cookies.login;

  if (!loginChk) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  // 初回roomにsocketを連携するため
  const usersOnRoom = await fetch(
    `http://localhost:3000/api/room/${room_id}?user_id=${userId}`,
    {
      method: "GET",
    }
  );

  if (usersOnRoom.status === 405) {
    return {
      redirect: {
        permanent: false,
        destination: "/chat",
      },
    };
  }

  const response = await fetch(
    `http://localhost:3000/api/room/${room_id}/chats`
  );
  const msg = await response.json();
  return {
    props: {
      room_id,
      msg,
    },
  };
};

const Home: NextPage<IProps> = ({ msg }) => {
  const router = useRouter();
  const { isLoginData } = useSelector((state: RootState) => state.Auth);
  const dispatch = useDispatch();

  const room_id = router.query.room_id;

  useEffect(() => {
    const socket = io("", {
      path: "/api/socket.io",
    });

    socket.on("connect", () => {
      console.log("successfully connected socket.io server", socket);
    });

    socket.on("connect_error", (err: any) => {
      console.log("failed to connect socket.io server", err);
    });

    socket.on("message", (message: IMsg) => {
      setChat((prev) => [...prev, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [chat, setChat] = useState<IMsg[]>(msg);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.content;

    if (!input.value) return;

    const message = {
      user_id: isLoginData.id,
      message: input.value,
    };

    await fetch(`/api/chat/${room_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    input.value = "";
    input.focus();
  }

  return (
    <>
      <Head>
        <title>Chat Start</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={"flex flex-col w-full h-screen"}>
        <div className={"flex-1"}>
          <div className="container mx-auto p-4">
            {chat.length ? (
              chat.map((chat) => (
                <div
                  key={`msg_${chat.id}`}
                  className={`mb-1 ${
                    chat.user_id === isLoginData.id ? "text-right" : ""
                  }`}
                >
                  <span
                    className={
                      chat.user_id === isLoginData.id ? "text-red-500" : ""
                    }
                  >
                    {chat.user_id === isLoginData.id ? "Me" : chat.user.name}
                  </span>
                  : {chat.message}
                  <span className={"ml-4 text-sm text-gray-300"}>
                    {dayjs(chat.createdAt).format("YYYY/MM/DD HH:mm:ss")}
                  </span>
                </div>
              ))
            ) : (
              <div className={"text-center text-gray-600 text-xl"}>
                채팅 기록이 없습니다.
              </div>
            )}
          </div>
        </div>
        <div>
          <form
            onSubmit={handleSubmit}
            className={"bg-gray-400 sticky bottom-0"}
          >
            <div className="container mx-auto flex items-center gap-x-4 p-4 h-20">
              <input
                className={"flex-1 h-full px-4"}
                type="text"
                name={"content"}
                placeholder={"write some chat..."}
              />
              <button className={"h-full px-4 bg-white"} type={"submit"}>
                submit
              </button>
              <Link href="/chat">
                <a className={"h-full px-4 bg-white"}>Chatに戻る</a>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Home;
