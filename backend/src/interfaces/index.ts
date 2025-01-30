import mongoose, { Document } from "mongoose";
import { UserRole } from "@/constants";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  username: string;
  email: string;
  password: string;
  photoURL: string;
  role: UserRole;
  comparePassword: (password: string) => Promise<boolean>;
}

export interface IBook extends Document {
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
  totalCopies: number;
  availableCopies: number;
  rating: number[];
  reviews: {
    user: mongoose.Types.ObjectId;
    comment: string;
  }[];
}

export interface IBookGenre extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
}
