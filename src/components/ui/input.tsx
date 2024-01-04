import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { CircleX } from "@/components/icons/circle-x";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  onClear?: () => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, onClear, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          type={type}
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
