import React from "react";
import Image from "next/image";

export const LogoLoading = () => {
  return (
    <div className="animate-pulse w-full flex justify-center py-5">
      <Image src="/icons/logo.png" alt="loading" height={16} width={16} />
    </div>
  );
};
