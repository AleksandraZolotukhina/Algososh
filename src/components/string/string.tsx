import React, { ChangeEvent, useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import styles from "./string.module.css";
import { v4 as key } from 'uuid';
import { Circle } from "../ui/circle/circle";
import circles from "../wrapper-circles.module.css";
import { ElementStates } from "../../types/element-states";
import { handlerChange, setTimer, swap } from "../../functions";

export const StringComponent: React.FC = () => {
  const [stringInput, setStringInput] = useState<string>("");
  const [reverseArray, setReverseArray] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isLoader, setIsLoader] = useState<boolean>(false);

  useEffect(()=>{
    return ()=>{
      setStringInput("");
      setReverseArray([]);
      setCurrentIndex(0);
      setIsLoader(false)
    }
  },[])
  
  const getArraySymbols = (string: string): string[] => {
    const arraySymbols = [];
    for (let i = 0; i < string.length; i++) {
      arraySymbols.push(string[i]);
    }
    return arraySymbols
  }

  const getReverseString = async (string: string): Promise<string[]> => {
    setCurrentIndex(0);
    setIsLoader(true);
    const arraySymbols: string[] = getArraySymbols(string);
    setReverseArray([...arraySymbols]);
    await setTimer(500);
    for (let i = 0, j = arraySymbols.length - 1; i < j; i++, j--) {
      swap(arraySymbols, i, j);
      setCurrentIndex((state) => state + 1);
      setReverseArray([...arraySymbols]);
      await setTimer(500);
    }
    setCurrentIndex((state) => state + 1)
    setIsLoader(false);
    return arraySymbols
  }


  const getColorCircle = (index: number, elementIndex: number) => {
    const length = reverseArray.length;
    if (elementIndex < index || elementIndex > length - 1 - index) {
      return ElementStates.Modified
    }
    if (elementIndex === index || elementIndex === length - 1 - index) {
      return ElementStates.Changing
    }
    return ElementStates.Default
  }

  return (
    <SolutionLayout title="Строка">
      <div className={styles.form}>
        <Input
          isLimitText={true}
          type={"text"}
          maxLength={11}
          onChange={(e) => handlerChange(e as ChangeEvent<HTMLInputElement>, setStringInput)}
        />
        <Button text={"Рассчитать"}
          isLoader={isLoader}
          disabled={stringInput === ""}
          onClick={() => getReverseString(stringInput)}
          data-cy="button"
        />
      </div>
      <div className={circles.wrapper} data-testid="circles">
        {reverseArray.map((el, index) =>
          <Circle
            key={key()}
            letter={el}
            state={getColorCircle(currentIndex, index)}
            data-testid="circle"
          />
        )}
      </div>
    </SolutionLayout>
  );
};
