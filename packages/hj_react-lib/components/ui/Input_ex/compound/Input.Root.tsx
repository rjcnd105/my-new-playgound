import React, { forwardRef } from "react";

import type { PolymorphicComponentProps } from "../../../../../utils/reactUtils";

export type RootProps = Pick<
  PolymorphicComponentProps<"div">,
  "className" | "children" | "onClick"
>;
export const Root = forwardRef<HTMLDivElement, RootProps>(
  (props: RootProps, ref) => {
    return <div {...props} ref={ref} />;
  }
);
Root.displayName = "InputRoot";
