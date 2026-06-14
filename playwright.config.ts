import { defineConfig, devices } from "@playwright/test";
import { OrtoniReportConfig } from "ortoni-report";
const config: OrtoniReportConfig = {
  open: "on-failure",
  projectName: "LetCode",
  meta: {
    OS: "MacOs",
    Release: "4.0.9",
    "Test cycle": "June - 2026",
    Epic: "Test Automation",
  },
  logo: "logo.png",
  testType: "Functional Tests",
  title: "LetCode - Test Automation",
};

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 4 : 4,
  reporter: [
    // ["junit", { outputFile: "results.xml" }],
    ["ortoni-report", config],
    // ["html", { open: "never" }],
  ],
  use: {
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: "https://letcode.in/",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: "Mobile Chrome",
    //   use: { ...devices["Pixel 5"] },
    // },
  ],
});
