import mongoose, { Schema, model, Model } from "mongoose";
import { IBook } from "src/interfaces";

const bookSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const Book: Model<IBook> = mongoose.models.Book || model("Book", bookSchema);
export default Book;
