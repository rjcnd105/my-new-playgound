export const isClientSide = Boolean(
  typeof window !== "undefined" && window.document?.createElement,
);

export const EasingFunctions = {
  // no easing, no acceleration
  linear: (t: number) => {
    return t;
  },
  // accelerating from zero velocity
  easeInQuad: (t: number) => {
    return t * t;
  },
  // decelerating to zero velocity
  easeOutQuad: (t: number) => {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  easeInOutQuad: (t: number) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  easeInCubic: (t: number) => {
    return t * t * t;
  },
  // decelerating to zero velocity
  easeOutCubic: (t: number) => {
    const decrementedT = t - 1;
    return decrementedT * decrementedT * decrementedT + 1;
  },
  // acceleration until halfway, then deceleration
  easeInOutCubic: (t: number) => {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  easeInQuart: (t: number) => {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuart: (t: number) => {
    const decrementedT = t - 1;
    return 1 - decrementedT * decrementedT * decrementedT * decrementedT;
  },
  // acceleration until halfway, then deceleration
  easeInOutQuart: (t: number) => {
    const decrementedT = t - 1;
    return t < 0.5
      ? 8 * t * t * t * t
      : 1 - 8 * decrementedT * decrementedT * decrementedT * decrementedT;
  },
  // accelerating from zero velocity
  easeInQuint: (t: number) => {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  easeOutQuint: (t: number) => {
    const decrementedT = t - 1;
    return (
      1 +
      decrementedT * decrementedT * decrementedT * decrementedT * decrementedT
    );
  },
  // acceleration until halfway, then deceleration
  easeInOutQuint: (t: number) => {
    const decrementedT = t - 1;
    return t < 0.5
      ? 16 * t * t * t * t * t
      : 1 +
          16 *
            decrementedT *
            decrementedT *
            decrementedT *
            decrementedT *
            decrementedT;
  },
};
export interface IOptions {
  cancelOnUserAction: boolean;
  easing: (t: number) => number;
  elementToScroll: Element | Window | null;
  horizontalOffset: number;
  maxDuration: number;
  minDuration: number;
  speed: number;
  verticalOffset: number;
}
export interface IOptionsWithOffset extends IOptions {
  top?: number;
  left?: number;
}

export interface IUserOptions extends Partial<IOptions> {
  elementToScroll?: Element | Window;
  top?: number;
  left?: number;
}

// --------- SCROLL INTERFACES

// ScrollDomElement and ScrollWindow have identical interfaces

class ScrollDomElement {
  element: Element;

  constructor(element: Element) {
    this.element = element;
  }

  getHorizontalScroll(): number {
    return this.element.scrollLeft;
  }

  getVerticalScroll(): number {
    return this.element.scrollTop;
  }

  getMaxHorizontalScroll(): number {
    return this.element.scrollWidth - this.element.clientWidth;
  }

  getMaxVerticalScroll(): number {
    return this.element.scrollHeight - this.element.clientHeight;
  }

  scrollTo(x: number, y: number) {
    this.element.scrollLeft = x;
    this.element.scrollTop = y;
  }
}

class ScrollWindow {
  element: Window = window;

  getHorizontalScroll(): number {
    return window.scrollX || document.documentElement.scrollLeft;
  }

  getVerticalScroll(): number {
    return window.scrollY || document.documentElement.scrollTop;
  }

  getMaxHorizontalScroll(): number {
    return (
      Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth,
      ) - window.innerWidth
    );
  }

  getMaxVerticalScroll(): number {
    return (
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight,
      ) - window.innerHeight
    );
  }

  scrollTo(x: number, y: number) {
    window.scrollTo(x, y);
  }
}

// --------- CHECK IF CODE IS RUNNING IN A BROWSER

// --------- ANIMATE SCROLL TO

const defaultOptions: IOptions = {
  cancelOnUserAction: true,
  easing: EasingFunctions.easeOutCubic,
  elementToScroll: isClientSide ? window : null, // Check for server side rendering
  horizontalOffset: 0,
  maxDuration: 3000,
  minDuration: 250,
  speed: 500,
  verticalOffset: 0,
};

async function customScrollTo(
  userOptions: IUserOptions = {},
): Promise<boolean> {
  // Check for server rendering
  if (!isClientSide) {
    // @ts-ignore
    // If it still gets called on server, return Promise for API consistency
    return new Promise((resolve: (hasScrolledToPosition: boolean) => void) => {
      resolve(false); // Returning false on server
    });
  }
  if (!(window as any).Promise) {
    throw "Browser doesn't support Promises, and animated-scroll-to depends on it, please provide a polyfill.";
  }

  let x: number;
  let y: number;
  const options: IOptionsWithOffset = {
    ...defaultOptions,
    ...userOptions,
  };

  const isWindow = options.elementToScroll === window;
  const isElement = !!(options.elementToScroll as Element).nodeName;

  if (!isWindow && !isElement) {
    throw "Element to scroll needs to be either window or DOM element.";
  }

  // Check for "scroll-behavior: smooth" as it can break the animation
  // https://github.com/Stanko/animated-scroll-to/issues/55
  const scrollBehaviorElement: Element = isWindow
    ? document.documentElement
    : (options.elementToScroll as Element);
  const scrollBehavior = getComputedStyle(
    scrollBehaviorElement,
  ).getPropertyValue("scroll-behavior");

  if (scrollBehavior === "smooth") {
    console.warn(
      `${scrollBehaviorElement.tagName} has "scroll-behavior: smooth" which can mess up with animated-scroll-to's animations`,
    );
  }

  // Select the correct scrolling interface
  const elementToScroll = isWindow
    ? new ScrollWindow()
    : new ScrollDomElement(options.elementToScroll as Element);

  if (options.top || options.left) {
    x = options.top ? options.top : elementToScroll.getHorizontalScroll();
    y = options.left ? options.left : elementToScroll.getVerticalScroll();
  } else {
    // ERROR
    throw "ScrollTo: Wrong function signature.";
  }

  // Add offsets
  x += options.horizontalOffset;
  y += options.verticalOffset;

  // Horizontal scroll distance
  const maxHorizontalScroll = elementToScroll.getMaxHorizontalScroll();
  const initialHorizontalScroll = elementToScroll.getHorizontalScroll();

  // If user specified scroll position is greater than maximum available scroll
  if (x > maxHorizontalScroll) {
    x = maxHorizontalScroll;
  }

  // Calculate distance to scroll
  const horizontalDistanceToScroll = x - initialHorizontalScroll;

  // Vertical scroll distance distance
  const maxVerticalScroll = elementToScroll.getMaxVerticalScroll();
  const initialVerticalScroll = elementToScroll.getVerticalScroll();

  // If user specified scroll position is greater than maximum available scroll
  if (y > maxVerticalScroll) {
    y = maxVerticalScroll;
  }

  // Calculate distance to scroll
  const verticalDistanceToScroll = y - initialVerticalScroll;

  // Calculate duration of the scroll
  const horizontalDuration = Math.abs(
    Math.round((horizontalDistanceToScroll / 1000) * options.speed),
  );
  const verticalDuration = Math.abs(
    Math.round((verticalDistanceToScroll / 1000) * options.speed),
  );

  let duration =
    horizontalDuration > verticalDuration
      ? horizontalDuration
      : verticalDuration;

  // Set minimum and maximum duration
  if (duration < options.minDuration) {
    duration = options.minDuration;
  } else if (duration > options.maxDuration) {
    duration = options.maxDuration;
  }

  return new Promise((resolve: (hasScrolledToPosition: boolean) => void) => {
    // Scroll is already in place, nothing to do
    if (horizontalDistanceToScroll === 0 && verticalDistanceToScroll === 0) {
      // Resolve promise with a boolean hasScrolledToPosition set to true
      resolve(true);
    }

    // To cancel animation we have to store request animation frame ID
    let requestID: number;

    // Cancel animation handler
    const cancelAnimation = () => {
      removeListeners();
      cancelAnimationFrame(requestID);

      // Resolve promise with a boolean hasScrolledToPosition set to false
      resolve(false);
    };

    // Prevent user actions handler
    const preventDefaultHandler = (e: Event) => e.preventDefault();

    const handler = options.cancelOnUserAction
      ? cancelAnimation
      : preventDefaultHandler;

    // If animation is not cancelable by the user, we can't use passive events
    const eventOptions: any = options.cancelOnUserAction
      ? { passive: true }
      : { passive: false };

    const events = ["wheel", "touchstart", "keydown", "mousedown"];

    // Function to remove listeners after animation is finished
    const removeListeners = () => {
      events.forEach((eventName) => {
        elementToScroll.element.removeEventListener(
          eventName,
          handler,
          eventOptions,
        );
      });
    };

    // Add listeners
    events.forEach((eventName) => {
      elementToScroll.element.addEventListener(
        eventName,
        handler,
        eventOptions,
      );
    });

    // Animation
    const startingTime = Date.now();

    const step = () => {
      const timeDiff = Date.now() - startingTime;
      const t = timeDiff / duration;

      const horizontalScrollPosition = Math.round(
        initialHorizontalScroll +
          horizontalDistanceToScroll * options.easing(t),
      );
      const verticalScrollPosition = Math.round(
        initialVerticalScroll + verticalDistanceToScroll * options.easing(t),
      );

      if (
        timeDiff < duration &&
        (horizontalScrollPosition !== x || verticalScrollPosition !== y)
      ) {
        // If scroll didn't reach desired position or time is not elapsed
        // Scroll to a new position
        elementToScroll.scrollTo(
          horizontalScrollPosition,
          verticalScrollPosition,
        );

        // And request a new step
        requestID = requestAnimationFrame(step);
      } else {
        // If the time elapsed, or we reached the desired offset
        // Set scroll to the desired offset (when rounding made it to be off a pixel or two)
        // Clear animation frame to be sure
        elementToScroll.scrollTo(x, y);

        cancelAnimationFrame(requestID);

        // Remove listeners
        removeListeners();

        // Resolve promise with a boolean hasScrolledToPosition set to true
        resolve(true);
      }
    };

    // Start animating scroll
    requestID = requestAnimationFrame(step);
  });
}

export default customScrollTo;
