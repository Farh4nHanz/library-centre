import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IUser } from "@/interfaces";

export type RequestParams = {
  id: string;
};

export type RequestWithCookies = {
  cookies: {
    accessToken?: string;
    refreshToken?: string;
  };
} & Request;

export type RequestWithUser = {
  user?: IUser;
} & Request;

export type DecodedToken = {
  userId: string;
} & JwtPayload;

export type UserRequestBody = {
  id: string;
  username: string;
  email: string;
  password: string;
  photoURL: string;
};

export type BookRequestBody = {
  title: string;
  author: string;
  description: string;
  genre: string[];
  cover: Express.Multer.File;
  isbn: number | null;
  pages: number;
  publisher: string;
  publicationDate: Date;
  totalCopies: number;
};

export type BookGenreRequestBody = {
  name: string;
}