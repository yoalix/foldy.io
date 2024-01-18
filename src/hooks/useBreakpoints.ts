import { useState, useEffect } from "react";

// Defined breakpoints by tailwindcss
// Only use if absolutely necessary
// Use tailwindcss for most of your responsive needs
const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
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
