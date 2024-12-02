import mongoose, { Model, UpdateQuery } from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";

import { User } from "@/interfaces";

export enum UserRole {
  admin = "admin",
  user = "user",
  bot = "bot",
}

const Schema = mongoose.Schema<User>;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    photoURL: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.user,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.username = _.startCase(this.username);
    this.email = this.email.toLowerCase();
  }

  next();
});

userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as UpdateQuery<any>;

  if (update?.$set?.username) {
    update.$set.username = _.startCase(update.$set.username);
  }

  next();
});

userSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

userSchema.set("toJSON", {
  virtuals: true,
});

/**
 * Compares a provided password with the user's stored password.
 *
 * @param password - The plaintext password to compare.
 * @returns {Promise<boolean>} - A promise that resolves to true if the passwords match, otherwise false.
 */
userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const UserModel: Model<User> = mongoose.model<User>("User", userSchema);

export default UserModel;
