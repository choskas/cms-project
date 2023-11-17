import { db } from "drizzle/db";
import { tasks } from "drizzle/schema";

const loadBoarData = async () => {
    const result = await db.select().from(tasks);
    return result
}

export default loadBoarData