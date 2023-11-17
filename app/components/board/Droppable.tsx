
import React from 'react';
import {useDroppable} from '@dnd-kit/core';
import { Card } from '../ui/card';

export function Droppable(props: any) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  const style = {
    opacity: isOver ? 1 : 0.5,
  };

  return (
    <Card ref={setNodeRef} style={style}>
      {props.children}
    </Card>
  );
}
  