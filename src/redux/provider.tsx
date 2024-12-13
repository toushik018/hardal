"use client";

import ReduxProvider from "./redux-provider";

const Providers = ({ children }: any) => {
  return <ReduxProvider>{children}</ReduxProvider>;
};

export default Providers;
