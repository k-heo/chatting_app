import type { GetStaticProps, NextPage } from "next";
import { useForm } from "react-hook-form";
import Head from "next/head";
import Image from "next/image";
import styles from "../../styles/Home.module.css";
import { useEffect, useState } from "react";
import Input from "@/components/input";
import Button from "@/components/button";
import { useDispatch, useSelector } from "react-redux";
import { isLoginCheck, isJoinReducer } from "@/store/slice/Auth";
import { RootState } from "@/store/createStore";
import { useRouter } from "next/router";

interface LoginForm {
  userId: string;
  password: string;
}

const Login: NextPage = () => {
  const { isLogin, isLoginData } = useSelector(
    (state: RootState) => state.Auth
  );
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();
  const dispatch = useDispatch();

  const onValid = (validForm: LoginForm) => {
    dispatch(isLoginCheck(validForm));
  };

  useEffect(() => {
    if (isLogin) {
      // dispatch(isJoinReducer(false));
      router.push("/");
    }
  }, [isLoginData, router, dispatch, isLogin]);

  return (
    <div className="mt-16 px-4">
      <h3 className="text-3xl font-bold text-center">Login</h3>
      <div className="mt-12">
        <div className="flex flex-col items-center">
          <h5 className="text-sm text-gray-500 font-medium">Login</h5>
          <div className="grid  border-b mt-8 grid-cols-1 w-96">
            <button
              className={
                "pb-4 font-medium text-sm border-b-2 border-orange-500 text-orange-400"
              }
              // onClick={onEmailClick}
            >
              Email
            </button>
          </div>
          <form
            onSubmit={handleSubmit(onValid)}
            className="flex flex-col mt-8 space-y-4"
          >
            <Input
              register={register("userId", {
                required: true,
              })}
              name="userId"
              label="userId"
              type="text"
              required
            />
            <Input
              register={register("password", {
                required: true,
              })}
              kind="password"
              name="password"
              label="Password"
              type="password"
              required
            />
            <Button text={"Let's Login ! "} />
            {/* <Button text={loading ? "Loading" : "Get login link"} /> */}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
