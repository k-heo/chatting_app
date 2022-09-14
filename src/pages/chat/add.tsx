import { RootState } from "@/store/createStore";
import { chatStart } from "@/store/slice/Chat";
import { peopleData } from "@/store/slice/People";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../../styles/Home.module.css";

const Home: NextPage = (): JSX.Element => {
  const { isPeopleData } = useSelector((state: RootState) => state.People);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(peopleData());
  }, [dispatch]);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className="text-5xl mb-12">People List</h1>
        {isPeopleData &&
          isPeopleData.map((people, key) => {
            return (
              <div key={key}>
                <button onClick={() => dispatch(chatStart(people))}>
                  <div>{people.name}</div>
                </button>
              </div>
            );
          })}
      </main>
    </div>
  );
};

export default Home;
