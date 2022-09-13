import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import structure from "../data-structure.module.css";
import circles from "../wrapper-circles.module.css";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { handlerChange, setTimer } from "../../functions";
import { ElementStates } from "../../types/element-states";

export const StackPage: React.FC = () => {

  const [stackSymbols, setStackSymbols] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const push = async (item: string) => {
    setStackSymbols([...stackSymbols, item]);
    setInput("");

    await setTimer(500);
    setCount(count + 1);
  }

  const pop = async (index: number) => {
    setCount(size() - 1);
    await setTimer(500);
    setStackSymbols(stackSymbols.filter((item, itemIndex) => itemIndex !== index));
  }

  const size = () => {
    return stackSymbols.length
  }

  const peak = () => {
    return size() - 1
  }

  const clear = () => {
    setStackSymbols([])
  }
  
  return (
    <SolutionLayout title="Стек">
      <div className={styles.wrapper}>
        <div className={`${structure.actions} ${styles.actions}`}>
          <Input isLimitText={true} type={"text"} maxLength={4} value={input} onChange={(e) => handlerChange(e as ChangeEvent<HTMLInputElement>, setInput)} />
          <Button text={"Добавить"} onClick={() => push(input)} disabled={input === ""} />
          <Button text={"Удалить"} onClick={() => pop(peak())} disabled={size() === 0} />
        </div>

        <Button text={"Очистить"} onClick={clear} disabled={size() === 0} />
      </div>
      <div className={circles.wrapper}>
        {stackSymbols.map((el, index) => <Circle key={index} letter={el} index={index} head={peak() === index ? "top" : null} state={index === count ? ElementStates.Changing : ElementStates.Default} />)}
       
      </div>
    </SolutionLayout>
  );
};
