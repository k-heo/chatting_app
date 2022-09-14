import type { NextPage } from "next";
import { useEffect, useState } from "react";

const About: NextPage = () => {
  const [dark, setDark] = useState("다크모드"); // 다크모드 있는곳 텍스트 !

  const toggleDarkMode = () => {
    if (localStorage.getItem("theme") === "dark") {
      // 다크모드 -> 기본모드
      localStorage.removeItem("theme"); // 다크모드 삭제
      document.documentElement.classList.remove("dark"); // html class에서 dark클래스 삭제 !
      setDark("기본모드");
    } else {
      // 기본모드 -> 다크모드
      document.documentElement.classList.add("dark"); // html의 class에 dark 클래스 추가 !
      localStorage.setItem("theme", "dark"); // localstorage에 dark를 추가해서 ! useEffect에서 처음에 검사해서 다크모드인지 판단해주려고 !
      setDark("다크모드");
    }
  };

  useEffect(() => {
    // 처음에 다크모드인지 판단해서 뿌려주기 !! ( 나중에는 상태관리를 해도 괜찮습니다 ! )
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <div className="bg-slate-400 grid gap-10 lg:grid-cols-2 xl:grid-cols-3 xl:place-content-center py-20 px-20 min-h-screen dark:bg-slate-900">
      <div className="bg-white sm:bg-red-400 md:bg-slate-300 lg:bg-orange-400 xl:bg-purple-300 2xl:bg-amber-300 p-6 rounded-3xl shadow-xl dark:bg-orange-700">
        <span className="font-semibold text-2xl">Select Itemsss</span>
        <ul>
          {[1, 2, 3, 4, 5].map((item, key) => {
            return (
              <div
                key={key}
                className="flex justify-between my-2 odd:bg-blue-100 even:bg-yellow-100"
              >
                <span className="text-gray-500">맛있는거</span>
                <span className="font-semibold">$19</span>
              </div>
            );
          })}
        </ul>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$10</span>
        </div>
        <button
          className="flex justify-center mt-5 bg-blue-500 text-white p-3 text-center rounded-xl w-3/4 mx-auto 
        hover:bg-teal-500 hover:text-black
        active:bg-yellow-500
        focus:bg-red-500
        "
        >
          Checkout
        </button>
      </div>
      <div className="bg-white overflow-hidden rounded-3xl shadow-xl dark:bg-gray-500">
        <div className="bg-blue-500 p-6 pb-14 dark:bg-red-400">
          <span className="text-white text-2xl dark:text-white">프로필</span>
        </div>
        <div className="rounded-3xl p-6 bg-white relative -top-5">
          <div className="flex relative -top-16 items-end justify-between">
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Orders</span>
              <span className="font-medium">340</span>
            </div>
            <div className="h-24 w-24 bg-zinc-300 rounded-full" />
            <div className="flex flex-col items-center">
              <span className="text-xs text-gray-500">Spent</span>
              <span className="font-medium">$340</span>
            </div>
          </div>
          <div className="relative  flex flex-col items-center -mt-14 -mb-5">
            <span className="text-lg font-medium">KKANA KANA</span>
            <span className="text-sm text-gray-500">KANA</span>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-3xl shadow-xl dark:bg-purple-600">
        <div className="flex mb-5 justify-between items-center">
          <span>⬅️</span>
          <div className="space-x-3">
            <span>😀4.9</span>
            <span className="shadow-xl p-2 rounded-md">💖</span>
          </div>
        </div>
        <div className="bg-zinc-400 h-72 mb-5" />
        <div className="flex flex-col">
          <span className="font-medium text-xl">맛있는 음식</span>
          <span className="text-xs text-gray-500">Chair</span>
          <div className="mt-3 mb-5 flex justify-between items-center">
            <div className="space-x-2">
              <button className="w-5 h-5 rounded-full bg-red-500 focus:ring-2 ring-offset-2 ring-red-500 transition" />
              <button className="w-5 h-5 rounded-full bg-indigo-500 focus:ring-2 ring-offset-2 ring-indigo-500 transition" />
              <button className="w-5 h-5 rounded-full bg-violet-600 focus:ring-2 ring-offset-2 ring-violet-500 transition" />
            </div>
            <div className="flex items-center space-x-5">
              <button className="rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                -
              </button>
              <span>1</span>
              <button className="rounded-lg bg-blue-200 flex justify-center items-center aspect-square w-8 text-xl text-gray-500">
                +
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <span className="font-medium text-2xl">$450</span>
          <button className="bg-blue-500 p-2 px-5 text-center text-xs text-white rounded-lg">
            Add to cart
          </button>
        </div>
      </div>
      <div
        className="rounded-full w-20 h-20 bg-gray-500 cursor-pointer text-lg font-medium text-center leading-[4.5rem]"
        onClick={() => toggleDarkMode()}
      >
        {dark}
      </div>
    </div>
  );
};

export default About;
