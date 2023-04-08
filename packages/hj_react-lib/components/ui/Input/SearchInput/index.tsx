import InputCompound from '@components/ui/Input/compound';
import { useBoolean } from '@hooks/useBoolean';
import { createPolymorphicComponentWithAllProps } from '@utils/reactUtils';
import { useEffect, useId, useImperativeHandle, useRef } from 'react';

import CloseCircleIcon from '../../../../assets/icon/close-circle.svg';
import SearchIcon from '../../../../assets/icon/search.svg';
import styles from './SearchInput.module.css';

const SearchInput = createPolymorphicComponentWithAllProps(
  InputCompound.Input,
)()((props, ref) => {
  const uniqueId = useId();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [hasValue, hasValueFlag] = useBoolean();
  const id = props.id ?? uniqueId;

  useImperativeHandle(ref, () => inputRef.current!, [ref]);

  useEffect(() => {
    if (!inputRef.current) return;
    function event() {
      if (inputRef.current!.value.length > 0) return hasValueFlag.on();
      hasValueFlag.off();
    }

    inputRef.current.addEventListener('keyup', event);
    return () => inputRef.current!.removeEventListener('keyup', event);
  }, [inputRef.current, hasValueFlag]);

  return (
    <InputCompound.Root
      className={styles.root}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.focus();
      }}
    >
      <label htmlFor={id}>
        <SearchIcon />
      </label>
      <InputCompound.Input
        {...props}
        data-hasvalue={hasValue}
        id={id}
        ref={inputRef}
      />
      <button
        type="button"
        onClick={(e) => {
          if (!inputRef.current) return;
          inputRef.current.value = '';
          inputRef.current.dispatchEvent(new Event('keyup', { bubbles: true }));
          inputRef.current.focus();
          e.stopPropagation();
        }}
      >
        <CloseCircleIcon width={14} height={14} viewBox="0 0 12 12" />
      </button>
    </InputCompound.Root>
  );
});

export default SearchInput;
