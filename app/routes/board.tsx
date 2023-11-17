import { DndContext } from "@dnd-kit/core";
import { Button } from "~/components/ui/button";
import { Form } from "@remix-run/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import loadBoarData from "~/controllers/board/loaders";
import boardAction from "~/controllers/board/actions";
import BoardTable from "~/components/board/BoardTable";
import useBoard from "~/components/board/hooks/useBoard";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const tasks = await loadBoarData();
  return { tasks };
};

const Board = () => {
const {handleDragEnd, tasks} = useBoard()

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Form method="post" className="grid grid-cols-4 gap-[12px] w-[200px]">
        <Label htmlFor="title">Titulo</Label>
        <Input name="title" className="col-span-4" />
        <Label htmlFor="description">Descripción</Label>
        <Input name="description" className="col-span-4" />
        <Button type="submit" className="col-span-4">
          Crear tarea
        </Button>
      </Form>
       <BoardTable tasks={tasks} />
    </DndContext>
  );
};

export async function action({ request }: ActionFunctionArgs) {
  return await boardAction(request);
}

export default Board;
