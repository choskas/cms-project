import type { ActionFunctionArgs } from "@remix-run/node";
import { eq } from "drizzle-orm";
import { db } from "drizzle/db";
import { tasks } from "drizzle/schema";

const onPost =async (request: ActionFunctionArgs['request']) => {
    const formData = await request.formData();
    const title = String(formData.get("title"));
    const description = String(formData.get("description"));
    const result = await db
      .insert(tasks)
      .values({ title: title, description: description, status: "todo" });
    return result;
}

const onPut = async (request: ActionFunctionArgs['request']) => {
    const data = await request.json()
    const result = await db.update(tasks).set({status: data.status}).where(eq(tasks.id, data.id))
    return result;
}

const boardAction = async (request: ActionFunctionArgs['request']) => {
    if (request.method === "POST") {
        return await onPost(request)
      }
      if (request.method === "PUT") {
       return await onPut(request)
      }
}

export default boardAction