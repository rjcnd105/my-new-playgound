import * as InputCompound from "../compound";

import React, { forwardRef, useId, useImperativeHandle, useRef } from "react";
import { useBoolean, useEventListener } from "usehooks-ts";

import type { GenerateComponentProps } from "../../../../../utils/reactUtils";
import clsx from "clsx";
import style from "./InputField.module.css";

type GeneretedProps = GenerateComponentProps<typeof InputCompound.Input>;
export type InputFieldProps = {
  invalid?: boolean;
  label?: string;
  rootClassName?: string;
} & GeneretedProps["Props"];

const InputField = forwardRef<GeneretedProps["Ref"], InputFieldProps>(
  ({ invalid, rootClassName, label, ...props }, ref) => {
    const uniqueId = useId();

    const inputRef = useRef<HTMLInputElement | null>(null);
    const isFocus = useBoolean(false);
    const isPasswordShow = useBoolean(false);
    const id = props.id ?? uniqueId;

    // 컴포넌트 내의 ref랑 외부에서 받은 ref랑 같은 객체를 가리키게 함
    useImperativeHandle(ref, () => inputRef.current!, [ref, inputRef]);

    useEventListener("focus", isFocus.setTrue, inputRef);
    useEventListener("blur", isFocus.setFalse, inputRef);

    return (
      <InputCompound.Root
        className={clsx(style.root, rootClassName)}
        aria-invalid={invalid}
        data-disabled={props.disabled}
        data-focus={isFocus.value}
        onClick={(e) => {
          e.stopPropagation();
          inputRef.current?.focus();
        }}
        data-uri={`${
          props.type === "search" ? "inputSearch/input" : "inputField/input"
        }`}
      >
        <InputCompound.Input
          {...props}
          placeholder={label}
          id={id}
          ref={inputRef}
          spellCheck={props.type !== "password" || props.spellCheck}
          type={isPasswordShow.value ? "text" : props.type}
        />
        <label htmlFor={id}>{label}</label>

        {props.type === "password" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              isPasswordShow.toggle();
            }}
            type="button"
            aria-pressed={isPasswordShow.value}
            aria-describedby="toggle show password"
          />
        )}

        {props.type === "search" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            aria-describedby="click search button"
          />
        )}
      </InputCompound.Root>
    );
  }
);

InputField.displayName = "InputField";

export default InputField;
