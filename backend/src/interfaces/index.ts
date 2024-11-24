import { Request } from "express";
import mongoose, { Document } from "mongoose";
import { type DecodedToken } from "@/types";

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  photoURL: string;
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface RequestWithCookies extends Request {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
  user?: User | DecodedToken;
}