import { useCallback, useRef } from "react";

interface UseIntersectionObserverProps extends IntersectionObserverInit {
  callback: IntersectionObserverCallback;
  onDisconnect?: (observer: IntersectionObserver) => void;
  onCreate?: (observer: IntersectionObserver) => void;
}
export const useIntersectionObserver = ({
  callback,
  onDisconnect,
  onCreate,
  root,
  rootMargin,
  threshold,
}: UseIntersectionObserverProps) => {
  const rootRef = useRef(root);
  const previousObserver = useRef<IntersectionObserver | null>(null);

  const setRootRef = useCallback(
    <T extends HTMLElement>(node: T) => {
      if (rootRef.current === node) return;

      if (previousObserver.current) {
        onDisconnect?.(previousObserver.current);
        previousObserver.current.disconnect();
        previousObserver.current = null;
      }

      if (node?.nodeType === Node.ELEMENT_NODE) {
        rootRef.current = node;

        const observer = new IntersectionObserver(callback, {
          root: rootRef.current,
          rootMargin,
          threshold,
        });
        previousObserver.current = observer;
        onCreate?.(previousObserver.current);
      }
    },
    [callback, onDisconnect, onCreate, threshold, rootRef.current, rootMargin],
  );

  return {
    setRootRef,
    observerRef: previousObserver,
  };
};
