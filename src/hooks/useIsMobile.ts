import { useBreakpoints } from "./useBreakpoints";

export const useIsMobile = () => {
    const breakpoint = useBreakpoints();
    return breakpoint === "xs" || breakpoint === "sm";
}
