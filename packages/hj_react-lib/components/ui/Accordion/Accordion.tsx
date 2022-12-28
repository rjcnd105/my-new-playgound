import React from "react";
import * as Accordion from "@radix-ui/react-accordion";
import "./styles.css";
import { AccordionHeaderTriggerProps } from "./types";
import clsx from "clsx";
import { fromOrigin } from "../../../src/lib/DerivedComponent";

const AccordionDemo = () => (
  <Accordion.Root
    className="AccordionRoot"
    type="single"
    defaultValue="item-1"
    collapsible
  >
    <Accordion.Item className="AccordionItem" value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>
        Yes. It adheres to the WAI-ARIA design pattern.
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-2">
      <AccordionTrigger>Is it unstyled?</AccordionTrigger>
      <AccordionContent>
        Yes. It's unstyled by default, giving you freedom over the look and
        feel.
      </AccordionContent>
    </Accordion.Item>

    <Accordion.Item className="AccordionItem" value="item-3">
      <AccordionTrigger>Can it be animated?</AccordionTrigger>
      <Accordion.Content className="AccordionContent">
        <div className="AccordionContentText">
          Yes! You can animate the Accordion with CSS or JavaScript.
        </div>
      </Accordion.Content>
    </Accordion.Item>
  </Accordion.Root>
);

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionHeaderTriggerProps
>(
  (
    { headerProps, triggerProps: { children, ...triggerProps }, Icon },
    forwardedRef,
  ) => (
    <Accordion.Header {...headerProps}>
      <Accordion.Trigger {...triggerProps} ref={forwardedRef}>
        {children}
        {Icon}
      </Accordion.Trigger>
    </Accordion.Header>
  ),
);

const a = fromOrigin(Accordion.Root)();

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  Accordion.AccordionContentProps
>(({ children, className, ...props }, forwardedRef) => (
  <Accordion.Content
    className={clsx("AccordionContent", className)}
    {...props}
    ref={forwardedRef}
  >
    <div className="AccordionContentText">{children}</div>
  </Accordion.Content>
));

export default AccordionDemo;
