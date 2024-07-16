import { useRef, useCallback } from "react";

// https://github.com/facebook/react/issues/15176

export default function useCallbackRef(rawCallback) {
  const cleanupRef = useRef(null);
  const callback = useCallback(
    (node) => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }

      if (node) {
        cleanupRef.current = rawCallback(node);
      }
    },
    [rawCallback],
  );

  return callback;
}

//const callback = useCallbackRef(useCallback((node) => {
//   node.addEventListener(...);
//   return () => {
//     node.removeEventListener(...);
//   };
// }, []));
