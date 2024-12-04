import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import mongoose, { Document } from "mongoose";
import { UserRole } from "@/constants";

export interface User extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  photoURL: string;
  role: UserRole;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface Book extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  author: string;
  description: string;
  genre: string[];
  coverURL: string;
  isbn: number | null;
  pages: number;
  publisher: string;
  publicationDate: Date;
  rating: number;
  slug: string;
}

export interface DecodedToken extends JwtPayload {
  userId: string;
}

export interface RequestWithCookies extends Request {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
  user?: User | DecodedToken;
}
