import { createActor, createMachine } from "xstate";

const toggleMachine = createMachine({
  id: "toggle",
  initial: "Inactive",
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      on: { toggle: "Inactive" },
    },
  },
});

// Creates an actor that you can send events to; not started yet!
const actor = createActor(toggleMachine);

// Subscribe to updated snapshots (emitted state changes) from the actor
actor.subscribe((snapshot) => {
  console.log("Value:", snapshot.value);
});

export const machine = createMachine(
  {
    id: "dog walk",
    initial: "waiting",
    states: {
      waiting: {
        on: {
          "leave home": {
            target: "on a walk",
            reenter: false,
          },
        },
      },
      "on a walk": {
        states: {
          activity: {
            initial: "walking",
            states: {
              walking: {
                on: {
                  "speed up": {
                    target: "running",
                    reenter: false,
                  },
                },
              },
              running: {
                on: {
                  "slow down": {
                    target: "walking",
                    reenter: false,
                  },
                },
              },
            },
          },
          tail: {
            initial: "not wagging",
            states: {
              "not wagging": {
                on: {
                  "wagging starts": {
                    target: "wagging",
                    reenter: false,
                  },
                },
              },
              wagging: {
                on: {
                  "wagging stops": {
                    target: "not wagging",
                    reenter: false,
                  },
                },
              },
            },
          },
        },
        on: {
          "arrive home": {
            target: "walk complete",
            reenter: false,
          },
        },
        type: "parallel",
      },
      "walk complete": {
        type: "final",
      },
    },
    types: {
      events: {} as
        | { type: "leave home" }
        | { type: "wagging starts" }
        | { type: "wagging stops" }
        | { type: "arrive home" }
        | { type: "speed up" }
        | { type: "slow down" },
    },
  },
  {
    actions: {},
    actors: {},
    guards: {},
    delays: {},
  },
);

// Start the actor!
actor.start(); // logs 'Inactive'

// Send events
actor.send({ type: "toggle" }); // logs 'Active'
actor.send({ type: "toggle" }); // logs 'Inactive'
