import express from "express";

declare module "express" {
  interface Response {
    cookie: (
      name: "accessToken" | "refreshToken",
      value: string,
      options?: CookieOptions
    ) => this;

    clearCookie: (
      name: "accessToken" | "refreshToken",
      options?: CookieOptions
    ) => this;
  }
}
