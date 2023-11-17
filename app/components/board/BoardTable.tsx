import type { Tasks } from "drizzle/types";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";

const BoardTable = ({ tasks }: { tasks: Tasks[] }) => {
  return (
    <div className="grid grid-cols-3 gap-[12px]">
      <Droppable id="todo">
        <h2>TODO</h2>
        {tasks.map(
          (item) =>
            item.status === "todo" && (
              <Draggable id={item.id} key={item.id}>
                {item.title}
              </Draggable>
            )
        )}
      </Droppable>
      <Droppable id="in_progress">
        <h2>In progress</h2>
        {tasks.map(
          (item) =>
            item.status === "in_progress" && (
              <Draggable id={item.id} key={item.id}>
                {item.title}
              </Draggable>
            )
        )}
      </Droppable>
      <Droppable id="ready">
        <h2>Ready</h2>
        {tasks.map(
          (item) =>
            item.status === "ready" && (
              <Draggable id={item.id} key={item.id}>
                {item.title}
              </Draggable>
            )
        )}
      </Droppable>
    </div>
  );
};

export default BoardTable;
