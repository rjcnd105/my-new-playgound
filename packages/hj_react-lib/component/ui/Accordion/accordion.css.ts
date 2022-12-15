// @import '@radix-ui/colors/blackA.css';
// @import '@radix-ui/colors/mauve.css';
// @import '@radix-ui/colors/violet.css';

import { recipe } from "@vanilla-extract/recipes";

export const button = recipe({
  base: {
    borderRadius: 6,
  },

  variants: {
    color: {
      neutral: { background: "whitesmoke" },
      brand: { background: "blueviolet" },
      accent: { background: "slateblue" },
    },
    size: {
      small: { padding: 12 },
      medium: { padding: 16 },
      large: { padding: 24 },
    },
    rounded: {
      true: { borderRadius: 999 },
    },
  },

  // Applied when multiple variants are set at once
  compoundVariants: [
    {
      variants: {
        color: "neutral",
        size: "large",
      },
      style: {
        background: "ghostwhite",
      },
    },
  ],

  defaultVariants: {
    color: "accent",
    size: "medium",
  },
});

const f = button({ color: "neutral", size: "large", rounded: true });

// /* reset */
// button,
//   h3 {
//   all: unset;
// }
//
// .AccordionRoot {
//   border-radius: 6px;
//   width: 300px;
//   background-color: var(--mauve6);
//   box-shadow: 0 2px 10px var(--blackA4);
// }
//
// .AccordionItem {
//   overflow: hidden;
//   margin-top: 1px;
// }
//
// .AccordionItem:first-child {
//   margin-top: 0;
//   border-top-left-radius: 4px;
//   border-top-right-radius: 4px;
// }
//
// .AccordionItem:last-child {
//   border-bottom-left-radius: 4px;
//   border-bottom-right-radius: 4px;
// }
//
// .AccordionItem:focus-within {
//   position: relative;
//   z-index: 1;
//   box-shadow: 0 0 0 2px var(--mauve12);
// }
//
// .AccordionHeader {
//   display: flex;
// }
//
// .AccordionTrigger {
//   font-family: inherit;
//   background-color: transparent;
//   padding: 0 20px;
//   height: 45px;
//   flex: 1;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 15px;
//   line-height: 1;
//   color: var(--violet11);
//   box-shadow: 0 1px 0 var(--mauve6);
//   background-color: white;
// }
//
// .AccordionTrigger:hover {
//   background-color: var(--mauve2);
// }
//
// .AccordionContent {
//   overflow: hidden;
//   font-size: 15px;
//   color: var(--mauve11);
//   background-color: var(--mauve2);
// }
// .AccordionContent[data-state='open'] {
//   animation: slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1);
// }
// .AccordionContent[data-state='closed'] {
//   animation: slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1);
// }
//
// .AccordionContentText {
//   padding: 15px 20px;
// }
//
// .AccordionChevron {
//   color: var(--violet10);
//   transition: transform 300ms cubic-bezier(0.87, 0, 0.13, 1);
// }
// .AccordionTrigger[data-state='open'] > .AccordionChevron {
//   transform: rotate(180deg);
// }
//
// @keyframes slideDown {
//   from {
//     height: 0;
//   }
//   to {
//     height: var(--radix-accordion-content-height);
//   }
// }
//
// @keyframes slideUp {
//   from {
//     height: var(--radix-accordion-content-height);
//   }
//   to {
//     height: 0;
//   }
// }
