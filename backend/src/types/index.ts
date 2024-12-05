export type RequestParams = {
  id: string;
};

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
};
