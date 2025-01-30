import mongoose, { Model, UpdateQuery } from "mongoose";
import _ from "lodash";
import { IBook } from "@/interfaces";
import { capitalizeLetter } from "@/utils/capitalizeLetter";
import { s3Service } from "@/services/s3Service";

const Schema = mongoose.Schema<IBook>;

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
        type: Schema.Types.ObjectId,
        ref: "BookGenre",
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
    rating: [
      {
        type: Number,
        min: 0,
        max: 5,
      },
    ],
    reviews: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { timestamps: true }
);

bookSchema.pre("save", function (next) {
  if (this.isNew) {
    this.title = capitalizeLetter(this.title);
    this.author = capitalizeLetter(this.author);
    this.description = _.upperFirst(this.description);
    this.genre = _.split(this.genre.toString(), ",").map((genre) =>
      genre.trim()
    );
    this.publisher = capitalizeLetter(this.publisher);
  }

  next();
});

bookSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<IBook>;

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

    Object.keys(update.$set).forEach((key) => {
      const typedKey = key as keyof IBook;
      switch (typedKey) {
        case "title":
          update.$set.title = capitalizeLetter(update.$set.title);
          break;

        case "author":
          update.$set.author = capitalizeLetter(update.$set.author);
          break;

        case "description":
          update.$set.description = _.upperFirst(update.$set.description);
          break;

        case "genre":
          update.$set.genre = _.split(update.$set.genre.toString(), ",")
            .map((genre) => genre.trim())
            .map((genre) => capitalizeLetter(genre));
          break;

        case "publisher":
          update.$set.publisher = capitalizeLetter(update.$set.publisher);
          break;
      }
    });
  }

  if (update.$push?.reviews && update.$push.reviews.comment !== "") {
    update.$push.reviews.comment = _.upperFirst(update.$push.reviews.comment);
  }

  next();
});

bookSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookSchema.set("toJSON", {
  virtuals: true,
});

const BookModel: Model<IBook> = mongoose.model<IBook>("Book", bookSchema);

export default BookModel;
