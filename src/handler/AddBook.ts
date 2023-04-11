import { connect, disconnect } from "../db/database";
import Book from "src/db/models/Book";

connect();
export async function handler(event: any, context: any) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log("event", event);
  console.log("context", context);
  try {
    const payload = { ...event.arguments.input };
    const { _id } = await Book.create(payload);

    disconnect();
    return { id: _id, ...payload };
  } catch (error) {
    disconnect();
    console.log(error);
    throw new Error("Internal error: " + error.message);
  }
}
