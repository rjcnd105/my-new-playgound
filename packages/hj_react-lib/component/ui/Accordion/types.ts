import { ReactNode } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import * as Record from "fp-ts/Record";

export type AccordionHeaderTriggerProps = {
  headerProps: Accordion.AccordionHeaderProps;
  triggerProps: Accordion.AccordionTriggerProps;
  Icon: ReactNode;
};
