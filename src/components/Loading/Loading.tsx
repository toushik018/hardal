"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Lottie from "lottie-react";
import animationData from "./loading.json";

const Loading = () => {
  const isLoading = useSelector((state: RootState) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-white/10 backdrop-blur-sm">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
        <img src="/logos/logoLarge.png" width={150} height={138} alt="Logo" />
        <Lottie
          width={250}
          height={250}
          animationData={animationData}
          loop={true}
        />
      </div>
    </div>
  );
};

export default Loading;
