import mongoose, { Model, UpdateQuery } from "mongoose";
import slugify from "slugify";
import _ from "lodash";
import { Book } from "@/interfaces";
import { capitalizeLetter } from "@/utils/capitalizeLetter";
import { s3Service } from "@/services/s3Service";

const Schema = mongoose.Schema<Book>;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    genre: [
      {
        type: String,
        min: 1,
        required: true,
      },
    ],
    coverURL: {
      type: String,
      default: null,
    },
    isbn: {
      type: Number,
      default: null,
    },
    pages: {
      type: Number,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publicationDate: {
      type: Date,
      required: true,
    },
    totalCopies: {
      type: Number,
      min: 1,
      required: true,
    },
    availableCopies: {
      type: Number,
      min: 0,
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

bookSchema.pre("save", function (next) {
  if (this.isNew) {
    this.title = capitalizeLetter(this.title);
    this.slug = slugify(this.title, { lower: true });
    this.author = capitalizeLetter(this.author);
    this.description = _.upperFirst(this.description);
    this.genre = _.split(this.genre.toString().trim(), ", ").map((genre) =>
      capitalizeLetter(genre)
    );
    this.publisher = capitalizeLetter(this.publisher);

    next();
  }

  next();
});

bookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<Book>;

  if (update?.$set) {
    const cover: Express.Multer.File = update.$set.cover;
    const existingBook = await this.model.findById(this.getQuery()._id);

    if (cover && existingBook) {
      const key = existingBook.coverURL.split(".com/")[1];
      await s3Service.deleteFile(key);

      const newKey = `uploads/${Date.now()}-${cover.originalname}`;
      update.$set.coverURL = await s3Service.uploadFile(
        newKey,
        cover.buffer,
        cover.mimetype
      );
    }

    Object.keys(update.$set).forEach(async (key) => {
      const typedKey = key as keyof Book;
      switch (typedKey) {
        case "title":
          update.$set.title = capitalizeLetter(update.$set.title);
          update.$set.slug = slugify(update.$set.title, { lower: true });
          break;

        case "author":
          update.$set.author = capitalizeLetter(update.$set.author);
          break;

        case "description":
          update.$set.description = _.upperFirst(update.$set.description);
          break;

        case "genre":
          update.$set.genre = _.split(update.$set.genre.toString(), ",").map(
            (genre) => capitalizeLetter(genre)
          );
          break;

        case "publisher":
          update.$set.publisher = capitalizeLetter(update.$set.publisher);
          break;
      }
    });

    update.$set.updatedAt = Date.now();
    next();
  }

  next();
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

const BookModel: Model<Book> = mongoose.model<Book>("Book", bookSchema);

export default BookModel;
