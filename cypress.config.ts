import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    viewportHeight: 1000,
    viewportWidth: 1600,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
