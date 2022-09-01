import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { Circle } from "../ui/circle/circle";
import circles from "../wrapper-circles.module.css";
import { ElementStates } from "../../types/element-states";

export const StringComponent: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [reverseArray, setReverseArray] = useState<string[][]>([]);
  const [arrayMapping, setArrayMapping] = useState<number>(-1);

  const getArraySymbols = (string: string): string[] => {
    const arraySymbols = [];
    for (let i = 0; i < string.length; i++) {
      arraySymbols.push(string[i])
    }
    return arraySymbols;
  }

  const getReverseString = (string: string): string[][] => {
    const arraySymbols: string[] = getArraySymbols(string);
    const arrayStates: string[][] = [];
    arrayStates.push(getArraySymbols(string));

    let current;
    for (let i = 0, j = arraySymbols.length - 1; i < j; i++, j--) {
      current = arraySymbols[i];
      arraySymbols[i] = arraySymbols[j];
      arraySymbols[j] = current;
      arrayStates.push(arraySymbols);
    }

    return arrayStates;
  }

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < reverseArray.length) {
        setArrayMapping(index++)
      }
      else {
        clearInterval(timer)
      }
    }, 1000)
  }, [reverseArray])

  const getClass = (index: number, elementIndex: number) => {
    const length = stringInput.length;
    if (elementIndex < index || elementIndex > length - 1 - index) {
      return ElementStates.Modified;
    }
    if (elementIndex === index || elementIndex === length - 1 - index) {
      return ElementStates.Changing;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.form}>
        <Input isLimitText={true} type={"text"} maxLength={11} onChange={(e) => setStringInput((e.target as HTMLInputElement).value)} />
        <Button text={"Рассчитать"} onClick={() => setReverseArray(getReverseString(stringInput))} />
      </div>
      <div className={circles.wrapper}>
        {arrayMapping > -1 && reverseArray[arrayMapping].map((el, index) => {
          const className = getClass(arrayMapping, index);
          return (<Circle key={index} letter={el} state={className} />)
        })}
      </div>
    </SolutionLayout>
  );
};
