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
  const [reverseArray, setReverseArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  
  const getArraySymbols = (string: string): string[] => {
    const arraySymbols = [];
    for (let i = 0; i < string.length; i++) {
      arraySymbols.push(string[i])
    }
    return arraySymbols;
  }

  const setTimer = (time: number) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        resolve();
      }, time)
    })
  }

  const getReverseString = async (string: string): Promise<string[]> => {
    setCurrentIndex(0);
    setIsLoader(true);
    const arraySymbols: string[] = getArraySymbols(string);
    let current;
    setReverseArray([...arraySymbols]);
    await setTimer(500);
    for (let i = 0, j = arraySymbols.length - 1; i < j; i++, j--) {
      current = arraySymbols[i];
      arraySymbols[i] = arraySymbols[j];
      arraySymbols[j] = current;
      setCurrentIndex((state) => state + 1)
      setReverseArray([...arraySymbols]);
      await setTimer(500);
    }
    setCurrentIndex((state) => state + 1)
    setIsLoader(false)
    return arraySymbols;
  }


  const getClassName = (index: number, elementIndex: number) => {
    const length = reverseArray.length;
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
        <Input isLimitText={true} type={"text"} maxLength={11} onChange={(e) => { setStringInput((e.target as HTMLInputElement).value) }} />
        <Button text={"Рассчитать"} isLoader={isLoader} disabled={stringInput !== "" ? false : true} onClick={() => getReverseString(stringInput)} />
      </div>
      <div className={circles.wrapper}>
        {reverseArray.map((el, index) => <Circle key={index} letter={el} state={getClassName(currentIndex, index)} />)}
      </div>
    </SolutionLayout>
  );
};
