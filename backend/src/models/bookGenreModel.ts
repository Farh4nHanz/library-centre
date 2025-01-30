import mongoose, { Model, UpdateQuery } from "mongoose";
import { IBookGenre } from "@/interfaces";
import { capitalizeLetter } from "@/utils/capitalizeLetter";

const Schema = mongoose.Schema<IBookGenre>;

const bookGenreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

bookGenreSchema.pre("save", function (next) {
  if (this.isNew) {
    this.name = capitalizeLetter(this.name);
  }

  next();
});

bookGenreSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate() as UpdateQuery<IBookGenre>;

  if (update?.$set) {
    update.$set.name = capitalizeLetter(update.$set.name);
  }

  next();
});

bookGenreSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

bookGenreSchema.set("toJSON", {
  virtuals: true,
});

const BookGenreModel: Model<IBookGenre> = mongoose.model<IBookGenre>(
  "BookGenre",
  bookGenreSchema
);

export default BookGenreModel;
