import { defineConfig, devices } from "@playwright/test";
import { OrtoniReportConfig } from "ortoni-report";
const config: OrtoniReportConfig = {
  // open: process.env.CI ? "never" : "on-failure",
  open: "always",
  projectName: "LetCode - Test Automation",
  authorName: "Koushik",
  meta: {
    OS: "MacOs",
    Release: "4.0.1",
    "Test cycle": "Sep 13 - 2025",
    Epic: "New Feature Implementation",
  },
  logo: "logo.png",
  testType: "CI tests",
  title: "LetCode - Test Automation",
};

export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 1,
  workers: process.env.CI ? 4 : 4,
  reporter: [
    ["junit", { outputFile: "results.xml" }],
    ["ortoni-report", config],
    // ["html", { open: "never" }],
  ],
  use: {
    trace: "retain-on-failure",
    screenshot: "on",
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

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],
});
