import mongoose, { Model, UpdateQuery } from "mongoose";
import _ from "lodash";
import bcrypt from "bcryptjs";
import { IUser } from "@/interfaces";
import { UserRole } from "@/constants";

const Schema = mongoose.Schema<IUser>;

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
  const update = this.getUpdate() as UpdateQuery<IUser>;

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

const UserModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default UserModel;
