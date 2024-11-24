import express from "express";

declare module "express" {
  interface Request {
    params: {
      id?: string;
    };
    body: {
      username?: string;
      email?: string;
      password?: string;
    };
  }

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
