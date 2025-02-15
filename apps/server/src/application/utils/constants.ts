export const Constants = {
  env: {
    JWT_SECRET: process.env.JWT_SECRET,
    HOME_UI: process.env.HOME_UI,
  },
  cookies: {
    AUTH_TOKEN: "auth-token",
  },
  queryParams: {
    ERRORS: "errors",
    SUCCESS: "success",
    page: {
      settings: {
        BACK_HREF: "back-href",
        AUTH_TOKEN: "auth-token",
      },
    },
  },
};
