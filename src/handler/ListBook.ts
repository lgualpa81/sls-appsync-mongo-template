import Book from "src/db/models/Book";
import { connect, disconnect } from "../db/database";

connect();
export async function handler(event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("event", event);
  console.log("context", context);
  try {
    const books = await Book.find().select("-__v -createdAt -updatedAt").lean();
    let rst = [];
    if (books.length > 0) {
      rst = books.map(({ _id: id, ...rest }) => ({ id, ...rest }));
    }
    disconnect();
    return rst;
  } catch (error) {
    disconnect();
    console.log(error);
    throw new Error("Internal error: " + error.message);
  }
}
