import { useState, useEffect } from "react";

// Define your breakpoints
const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
};

export const useBreakpoints = () => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState("xs");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < breakpoints.sm) {
        setCurrentBreakpoint("xs");
      } else if (window.innerWidth < breakpoints.md) {
        setCurrentBreakpoint("sm");
      } else if (window.innerWidth < breakpoints.lg) {
        setCurrentBreakpoint("md");
      } else if (window.innerWidth < breakpoints.xl) {
        setCurrentBreakpoint("lg");
      } else {
        setCurrentBreakpoint("xl");
      }
    };

    // Set the initial state
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return currentBreakpoint;
};
