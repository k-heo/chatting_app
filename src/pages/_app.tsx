import "../../styles/globals.css";
import type { AppProps } from "next/app";
// components
import DefaultLayout from "../components/layouts/DefaultLayout";
// redux
import { Provider } from "react-redux";
import store from "../store/createStore";

const chatApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <Provider store={store}>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Provider>
  );
};

export default chatApp;
