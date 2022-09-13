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

export const QueuePage: React.FC = () => {
  const [tail, setTail] = useState<number>(0);
  const [head, setHead] = useState<number>(0);
  const [length, setLength] = useState<number>(0);
  const [count, setCount] = useState<number>(-1);
  let size: number = 7;

  const [stackSymbols, setStackSymbols] = useState<string[] | undefined[]>(Array(size).fill(undefined));
  const [input, setInput] = useState<string>("");

  const enqueue = async (item: string) => {
    setInput("");

    if (tail === size) {
      setTail(0);
    }
    const index = tail % size;
    setStackSymbols((state) => { state.splice(index, 1, item); return state })
    setTail((state)=>state + 1);
    setLength(length + 1);

    setCount(index);
    await setTimer(500);
    setCount(-1);
    await setTimer(500);
  }

  const dequeue = async () => {
    if (head + 1 === size) {
      setHead(-1);
    }
    const index = head % size;
    setStackSymbols((state) => { state.splice(index, 1, undefined); return state })
    setCount(index);
    await setTimer(500);
    setHead((state)=>state + 1);
    setLength(length - 1);


    setCount(-1);
    await setTimer(500);
  }

  const clear = () => {
    setStackSymbols(Array(size).fill(undefined))
    setHead(0);
    setTail(0);
    setLength(0);
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.wrapper}>
        <div className={`${structure.actions} ${styles.actions}`}>
          <Input isLimitText={true} type={"text"} maxLength={4} value={input} onChange={(e) => handlerChange(e as ChangeEvent<HTMLInputElement>, setInput)} />
          <Button text={"Добавить"} onClick={() => enqueue(input)} disabled={input === "" || size === length} />
          <Button text={"Удалить"} onClick={dequeue} disabled={length === 0} />
        </div>

        <Button text={"Очистить"} onClick={clear} disabled={tail === 0 && head === 0} />
      </div>
      <div className={circles.wrapper}>
        {stackSymbols.map((el, index) => <Circle key={index} letter={el} index={index} head={index === head ? "head" : ""} tail={index === tail -1 ? "tail" : ""} state={index === count ? ElementStates.Changing : ElementStates.Default}/>)}
      </div>
    </SolutionLayout>
  );
};
