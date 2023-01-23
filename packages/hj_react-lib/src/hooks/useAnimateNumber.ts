import { useEffect } from "react";
import { Subscriber, useMotionValue, useSpring } from "framer-motion";

export type UseAnimateNumberProps = {
  value: number;
  subscribe: Subscriber<number>;
  springOpt?: Parameters<typeof useSpring>[1];
};

export function useAnimatedNumber({
  value,
  subscribe,
  springOpt,
}: UseAnimateNumberProps) {
  const motionValue = useMotionValue(value);
  const springValue = useSpring(motionValue, springOpt);

  useEffect(() => {
    motionValue.set(value);
  }, [value]);

  useEffect(() => {
    return springValue.onChange(subscribe);
  }, [springValue]);
}
