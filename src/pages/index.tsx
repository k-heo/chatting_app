import { RootState } from "@/store/createStore";
import { isLoginReducer } from "@/store/slice/Auth";
import { getCookie, setCookie } from "cookies-next";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/Home.module.css";

const Home: NextPage = () => {
  const { isLogin, isLoginData } = useSelector(
    (state: RootState) => state.Auth
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const logOut = () => {
    setCookie("login", "");
    dispatch(isLoginReducer(false));
    window.location.href = "";
  };
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {isLogin ? (
          <>
            <h1 className="text-5xl mb-12">
              {isLoginData.name}様のチャットList
            </h1>
            <div className="w-96 flex justify-center">
              <button
                className="flex justify-center mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-aut hover:bg-teal-500 hover:text-black active:bg-yellow-500 focus:bg-red-500"
                onClick={() => router.push("/chat")}
              >
                Chat List Go!
              </button>
            </div>
            <div className="w-96 flex justify-center">
              <button
                className="flex justify-center mt-5 bg-red-500 text-white p-3 text-center rounded-xl w-3/4 mx-aut hover:bg-orange-500 hover:text-black active:bg-yellow-500 focus:bg-red-500"
                onClick={() => logOut()}
              >
                LogOut
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-5xl mb-12">Chat Strat !!</h1>
            <div className="w-96 flex justify-center">
              <button
                className="flex justify-center mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-aut hover:bg-teal-500 hover:text-black active:bg-yellow-500 focus:bg-red-500"
                onClick={() => router.push("/login")}
              >
                Login
              </button>
            </div>
            <div className="w-96 flex justify-center">
              <button
                className="flex justify-center mt-5 bg-red-500 text-white p-3 text-center rounded-xl w-3/4 mx-aut hover:bg-orange-500 hover:text-black active:bg-yellow-500 focus:bg-red-500"
                onClick={() => router.push("/join")}
              >
                Join
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
