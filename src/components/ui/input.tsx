import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { CircleX } from "@/components/icons/circle-x";
import { useState } from "react";
import { Eye } from "lucide-react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onClear, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-9 w-full border-b border-input bg-transparent px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className,
            icon && "pl-9"
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            {icon}
          </div>
        )}
        {type === "password" && (
          <Button
            className="absolute right-9 top-1/2 transform -translate-y-1/2"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </Button>
          // <img
          //   src={
          //     showPassword ? "/path/to/hide-icon.png" : "/icons/eye-open.png"
          //   }
          //   alt="toggle visibility"
          //   className="absolute right-9 top-1/2 transform -translate-y-1/2 cursor-pointer"
          //   width={18}
          //   onClick={() => setShowPassword(!showPassword)}
          // />
        )}
        {onClear && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute inset-y-0 right-0"
          >
            <CircleX fill="#E7E7E7" />
          </Button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
