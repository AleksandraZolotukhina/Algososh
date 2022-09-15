import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import structure from "../data-structure.module.css";
import circles from "../wrapper-circles.module.css";
import styles from "./queue-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { handlerChange, setTimer } from "../../functions";
import { ElementStates } from "../../types/element-states";
import { Queue } from "./class-queue";

export const QueuePage: React.FC = () => {
  const [count, setCount] = useState<number>(-1);
  const [queue] = useState(new Queue<string>(7));
  const [queueSymbols, setQueueSymbols] = useState<string[] | undefined[]>(queue.getQueue());
  const [tail, setTail] = useState<number>(queue.getTail());
  const [head, setHead] = useState<number>(queue.getHead());
  const [length, setLength] = useState<number>(queue.getLength());

  const [input, setInput] = useState<string>("");

  const enqueue = async (item: string) => {
    setInput("");
    queue.enqueue(item);

    setQueueSymbols(queue.getQueue());
    setTail(queue.getTail());
    setLength(queue.getLength());

    setCount(tail % queue.getSize());
    await setTimer(500);
    setCount(-1);
    await setTimer(500);
  }

  const dequeue = async () => {
    queue.dequeue();
    setQueueSymbols(queue.getQueue());
    setCount(head & queue.getSize());
    await setTimer(500);

    setHead(queue.getHead());
    setLength(queue.getLength());
    setCount(-1);
    await setTimer(500);
  }

  const clear = () => {
    queue.clear();
    setQueueSymbols(queue.getQueue());
    setHead(queue.getHead());
    setTail(queue.getTail());
    setLength(queue.getLength());
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <div className={`${structure.actions} ${styles.actions}`}>
          <Input
            type={"text"}
            isLimitText={true}
            maxLength={4}
            value={input}
            onChange={(e) => handlerChange(e as ChangeEvent<HTMLInputElement>, setInput)} 
          />
          <Button
            text={"Добавить"}
            onClick={() => enqueue(input)} disabled={input === "" || queue.getSize() === length} 
          />
          <Button
            text={"Удалить"}
            onClick={dequeue} disabled={length === 0} 
          />
        </div>

        <Button
          text={"Очистить"}
          onClick={clear}
          disabled={tail === 0 && head === 0}
        />
      </div>
      <div className={circles.wrapper}>
        {queueSymbols.map((el, index) =>
          <Circle
            key={index}
            letter={el}
            index={index}
            head={index === head ? "head" : ""}
            tail={index === tail - 1 ? "tail" : ""}
            state={index === count ? ElementStates.Changing : ElementStates.Default}
          />)}
      </div>
    </SolutionLayout>
  );
};
