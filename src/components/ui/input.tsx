"use client";
import * as React from "react";

import { cn } from "@/lib/utils/utils";
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
      <div className={cn("relative", className)}>
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={cn(
            "flex h-9 w-full border-b border-input bg-transparent px-3 py-1 transition-colors file:border-0 file:bg-transparent file:file:font-medium placeholder:text-black-secondary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 text-base",
            className,
            icon && "pl-9"
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div className="absolute border-b inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
            {icon}
          </div>
        )}
        {type === "password" && (
          <Button
            className="absolute border-b top-1/2 transform  inset-y-0 right-0"
            variant="ghost"
            size="icon"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
          </Button>
        )}
        {onClear && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            className="absolute border-b inset-y-0 right-0"
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
