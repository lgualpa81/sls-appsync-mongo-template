import Book from "src/db/models/Book";
import { connect, disconnect } from "../db/database";

connect();
export async function handler(event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("event", event);
  console.log("context", context);
  try {
    const { title } = event.arguments;
    const book = await Book.aggregate([
      { $match: { title } },
      {
        $project: {
          title: 1,
          id: "$_id",
          _id: 0
        },
      },
    ]);
    disconnect();
    return book;
  } catch (error) {
    disconnect();
    console.log(error);
    throw new Error("Internal error: " + error.message);
  }
}
