"use client";

import React, { useEffect } from "react";

export const PWABanner = () => {
  const [isPWA, setIsPWA] = React.useState(false);
  //   useEffect(() => {
  //     if (window?.matchMedia("(display-mode: standalone)")?.matches) {
  //       setIsPWA(true);
  //     }
  //   }, [window]);
  if (isPWA) return null;
  return <div>PWABanner</div>;
};
