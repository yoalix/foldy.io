import Image from "next/image";
import React from "react";

export const SplashScreen = () => {
  return (
    <div className="fixed top-0 left-0  right-0 bottom-0 w-screen h-screen bg-primary-700 flex justify-center items-center">
      <Image
        src={"/icons/logo.png"}
        alt="logo"
        width={50}
        height={50}
        className="animate-pulse"
      />
    </div>
  );
};
