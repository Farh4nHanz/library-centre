import mongoose, { Model, UpdateQuery } from "mongoose";
import slugify from "slugify";
import _ from "lodash";
import { Book } from "@/interfaces";
import { capitalizeLetter } from "@/utils/capitalizeLetter";

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
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    slug: {
      type: String,
      unique: true,
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
    this.publicationDate = new Date(this.publicationDate);

    next();
  }

  next();
});

bookSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as UpdateQuery<Book>;

  if (update?.$set) {
    Object.keys(update.$set).forEach((key) => {
      const typedKey = key as keyof Book;
      switch (typedKey) {
        case "title":
          update.$set.title = capitalizeLetter(update.$set.title);
          update.$set.slug = slugify(update.$set.title, { lower: true });
          break;

        case "author":
          update.$set.author = capitalizeLetter(update.$set.author);
          break;

        case "genre":
          update.$set.genre = _.split(update.$set.genre.toString(), ",").map(
            (genre) => capitalizeLetter(genre)
          );
          break;

        case "description":
          update.$set.description = _.upperFirst(update.$set.description);
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
