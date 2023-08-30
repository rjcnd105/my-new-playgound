import clsx from "clsx";
import type { ClipboardEventHandler, ComponentRef } from "react";
import React, { useEffect, useRef } from "react";
import { proxy, useSnapshot } from "valtio";
import { z } from "zod";

import * as InputCompound from "../compound";
import style from "./CertiInputs.module.css";

export const UNAVAILABLE_CHARS = "UNAVAILABLE_CHARS";
export const UNAVAILABLE_STRING = "UNAVAILABLE_STRIG";

export type CertiInputProps = InputCompound.InputProps & {
  // 내부 인풋 갯수
  inputNumber: number;
  invalid?: boolean;
  rootClassName?: string;
  onKeyDownWithFullValue: (
    e: React.FormEvent<HTMLInputElement>,
    fullValue: string,
  ) => void;
  onError?: ({
    code,
    value,
  }: {
    code: typeof UNAVAILABLE_CHARS | typeof UNAVAILABLE_STRING;
    value: string;
  }) => void;
};

type CompoundRootRef = ComponentRef<typeof InputCompound.Root>;

const IndexToNum = z.string().transform(Number);

const CertiInputs = ({
  inputNumber,
  rootClassName,
  invalid,
  className,
  onError,
  onKeyDownWithFullValue,
  ...props
}: CertiInputProps) => {
  const state = useRef(proxy<string[]>(new Array(inputNumber).fill("")));
  const snap = useSnapshot(state.current);

  const wrapRef = useRef<CompoundRootRef | null>(null);
  const certiInputsRef = useRef<NodeListOf<HTMLInputElement> | null>(null);

  useEffect(() => {
    if (!wrapRef.current) return;

    // Ref Set
    certiInputsRef.current = wrapRef.current.querySelectorAll<HTMLInputElement>(
      '[data-uri="@CertiInputs/input"]',
    );

    // focus Events
    const parseCertiInputs = (target: unknown) =>
      target instanceof HTMLInputElement &&
      target.getAttribute("data-uri") === "@CertiInputs/input"
        ? target
        : null;
    const focusAddClass = (e: FocusEvent) => {
      parseCertiInputs(e.target)?.parentElement?.setAttribute(
        "data-focus",
        "true",
      );
    };
    const focusRemoveClass = (e: FocusEvent) => {
      parseCertiInputs(e.target)?.parentElement?.setAttribute(
        "data-focus",
        "false",
      );
    };
    wrapRef.current.addEventListener("focus", focusAddClass, true);
    wrapRef.current.addEventListener("blur", focusRemoveClass, true);

    return () => {
      wrapRef.current?.removeEventListener("focus", focusAddClass, true);
      wrapRef.current?.removeEventListener("blur", focusRemoveClass, true);
    };
  }, [wrapRef]);

  // 키 입력 처리
  const indexedCertiKeyUp: React.KeyboardEventHandler<HTMLInputElement> = (
    e,
  ) => {
    if (!(e.target instanceof HTMLInputElement)) return false;

    // 붙혀넣기의 경우 handlePasts에서 처리
    if ((e.metaKey || e.ctrlKey) && e.key === "v") return true;
    let isChange = false;

    const index = IndexToNum.parse(e.target.getAttribute("data-index"));

    // 붙혀넣기가 아닌 경우
    // 키 입력
    if (/^[0-9a-zA-Z]$/g.test(e.key)) {
      state.current[index] = e.key;
      if (index + 1 < inputNumber) certiInputsRef.current?.[index + 1].focus();
      isChange = true;
    }
    // 삭제
    else if (e.key === "Backspace") {
      state.current[index] = "";
      if (index - 1 >= 0) certiInputsRef.current?.[index - 1].focus();
      isChange = true;
    } else if (/^.$/.test(e.key)) {
      onError?.({ code: UNAVAILABLE_CHARS, value: e.key });
    }
    if (isChange) {
      e.preventDefault();
      onKeyDownWithFullValue(e, state.current.join(""));
    }

    props.onKeyDown?.(e);
  };

  // 붙혀넣기 처리
  const handlePasts: ClipboardEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (!(e.target instanceof HTMLInputElement)) return false;
    const index = Number(e.target.getAttribute("data-index"));

    const clipboardText = e.clipboardData.getData("text");

    if (!/^[0-9a-zA-Z]+$/.test(clipboardText))
      return onError?.({ code: UNAVAILABLE_STRING, value: clipboardText });
    let strIndex = 0;

    // 현재 인덱스로부터 붙혀넣기
    state.current.forEach((_, i) => {
      if (i >= index && clipboardText[strIndex])
        state.current[i] = clipboardText[strIndex++];
    });

    onKeyDownWithFullValue(e, state.current.join(""));

    props.onPaste?.(e);
  };

  return (
    <InputCompound.Root
      ref={wrapRef}
      className={clsx(style.root, rootClassName, "gap-4.5")}
    >
      {snap.map((value, index) => (
        <div
          key={`Certi-${index}`}
          data-uri="@CertiInputs/inputBox"
          aria-invalid={invalid}
          data-focus={false}
        >
          <InputCompound.Input
            data-uri="@CertiInputs/input"
            data-index={index}
            className={className}
            value={value}
            placeholder="*"
            disabled={props.disabled}
            onKeyDown={indexedCertiKeyUp}
            onPaste={handlePasts}
            type="number"
            inputMode="numeric"
            pattern="[0-9]*"
            {...props}
          />
          {/*동적이라 ID 대신 label을 클릭하면 포커스 이동되게 처리했어요 */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label
            data-index={index}
            onClick={(e) => {
              if (e.target instanceof HTMLLabelElement) {
                const input = e.target
                  .previousElementSibling as HTMLInputElement | null;
                input?.focus();
              }
            }}
          />
        </div>
      ))}
    </InputCompound.Root>
  );
};

export default CertiInputs;
