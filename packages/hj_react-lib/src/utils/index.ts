import type { RefObject } from 'react';

export function inputChangeTrigger(el: HTMLInputElement, newValue: string) {
  Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    'value',
  )?.set?.call(el, newValue);
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

type PosT = 'top' | 'center' | 'bottom';

type ScrollOpt = {
  smooth: boolean;
  position: PosT;
  extraValue: number;
};
const defaultScrollOpt: ScrollOpt = {
  smooth: false,
  position: 'top',
  extraValue: 0,
};

export function getPositionValue(
  position: ScrollOpt['position'],
  {
    scrollSize,
    elTop,
    elSize,
  }: { scrollSize: number; elTop: number; elSize: number },
) {
  switch (position) {
    case 'top':
      return elTop;
    case 'center':
      return elTop - scrollSize / 2 + elSize / 2;
    case 'bottom':
      return elTop - scrollSize + elSize;
  }
}

function getPositionY(
  position: ScrollOpt['position'],
  scrollEl: Pick<HTMLElement, 'offsetHeight'>,
  el: Pick<HTMLElement, 'offsetTop' | 'offsetHeight'>,
) {
  return getPositionValue(position, {
    scrollSize: scrollEl.offsetHeight,
    elTop: el.offsetTop,
    elSize: el.offsetHeight,
  });
}

export function removeHTMLTag(str: string) {
  return str.replace(/<[^>]+>/g, '');
}

type ElementT = string | RefObject<HTMLElement>;

export function getEl(el: ElementT) {
  return typeof el === 'string'
    ? document.querySelector<HTMLElement>(el)
    : el.current;
}

export function scrollToY(
  scrollSelector: ElementT,
  childSelector: ElementT,
  _scrollOpt: Partial<ScrollOpt>,
) {
  const scrollEl = getEl(scrollSelector);
  const childrenEl = getEl(childSelector);
  const { smooth, position, extraValue } = {
    ...defaultScrollOpt,
    ..._scrollOpt,
  };

  if (!scrollEl || !childrenEl) return;

  const positionValue =
    getPositionY(position, scrollEl, childrenEl) + extraValue;

  smooth
    ? scrollEl.scrollTo({
      behavior: 'smooth',
      top: positionValue,
    })
    : (scrollEl.scrollTop = positionValue);
}

export const onEnter =
  (fn: React.KeyboardEventHandler<HTMLInputElement>) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        e.preventDefault();
        return fn(e);
      }
    };

export function elementOnceInterval<E>(
  findElFn: () => E,
  checkDelay = 30,
  maxTimeout = 1000,
) {
  let interval: NodeJS.Timeout;
  let timeout: NodeJS.Timeout;

  return function once(onceFn: (e: NonNullable<E>) => any) {
    interval = setInterval(() => {
      const el = findElFn();
      if (el) {
        clearInterval(interval);
        clearTimeout(timeout);
        onceFn(el as NonNullable<E>);
      }
    }, checkDelay);
    setTimeout(() => {
      clearInterval(interval);
    }, maxTimeout);
  };
}

export function elementOnceFrame<E>(findElFn: () => E, maxTimeout = 500) {
  let stop = false;
  let timeout: NodeJS.Timeout;

  return function once(onceFn: (e: NonNullable<E>) => any) {
    function frame() {
      if (stop) return;
      const el = findElFn();
      if (el) {
        clearTimeout(timeout);
        onceFn(el as NonNullable<E>);
        return;
      }
      requestAnimationFrame(frame);
    }

    setTimeout(() => {
      stop = true;
    }, maxTimeout);

    requestAnimationFrame(frame);
  };
}
