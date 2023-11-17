import type { DragEndEvent } from "@dnd-kit/core";
import type { Tasks } from "drizzle/types";
import { useLoaderData } from "@remix-run/react";

import { useState } from "react";

const useBoard = () => {
    const data: { tasks: Tasks[] } = useLoaderData();
    const [tasks, setTasks] = useState<Tasks[]>(data.tasks);
  
    async function handleDragEnd(data: DragEndEvent) {
      const newTasksArr = tasks.map((item) => {
        if (data.over && item.id === data.active.id) {
          return { ...item, status: data.over.id as Tasks["status"] };
        }
        return { ...item };
      });
      setTasks(newTasksArr);
      if (!data.active.id || !data.over) return;
      await fetch("/board", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: String(data.active.id),
          status: data.over.id,
        }),
      });
    }
    return {
        handleDragEnd,
        tasks,
    }
}

export default useBoard