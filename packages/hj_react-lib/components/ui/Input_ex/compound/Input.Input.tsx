import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import React, { forwardRef } from "react";

export type InputProps = {
  onEnter?: React.KeyboardEventHandler<HTMLInputElement>;
} & ComponentPropsWithoutRef<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ onEnter, ...props }, ref) => {
    return (
      <input
        {...props}
        className={clsx("w-full bg-transparent", props.className)}
        ref={ref}
        onKeyDown={(e) => {
          props.onKeyDown?.(e);
          if (e.key === "Enter") onEnter?.(e);
        }}
      />
    );
  }
);
Input.displayName = "Input";
