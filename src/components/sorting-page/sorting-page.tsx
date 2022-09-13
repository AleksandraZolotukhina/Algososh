import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { handlerChange, setTimer, swap } from "../../functions";
import { ElementStates } from "../../types/element-states";

export const SortingPage: React.FC = () => {
  const [sortingName, setSortingName] = useState<string>("selection-sort");
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [counter, setCounter] = useState<number>(-1);

  const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const getRandomArray = (): number[] => {
    const countElements: number = getRandomNumber(3, 17);
    const array: number[] = [];
    for (let i = 0; i < countElements; i++) {
      array.push(getRandomNumber(0, 100))
    }
    return array
  }

  const compareLower = (a: number, b: number): boolean => {
    return a < b;
  }

  const compareGreater = (a: number, b: number): boolean => {
    return a > b;
  }

  const getClassName = (index: number, elementIndex: number) => {
    if (elementIndex < index) {
      return ElementStates.Modified
    }
    if (elementIndex === index || counter === elementIndex) {
      return ElementStates.Changing
    }
    return ElementStates.Default
  }

  const sortArraySelectMethod = async (array: number[], compare: (a: number, b: number) => boolean) => {
    let index;
    for (let i = 0; i < array.length - 1; i++) {
      index = i;
      setCurrentIndex(index);
      setCounter(i)
      await setTimer(500);
      for (let j = i; j < array.length - 1; j++) {
        setCounter(j + 1)
        await setTimer(500);
        if (compare(array[index], array[j + 1])) {
          index = j + 1;
        }
      }
      swap(array, i, index);
    }
    setCurrentIndex((index) => index + 1);
    await setTimer(500);
    setCurrentIndex((index) => index + 1);
    return array
  }


  const sortArrayBubbleMethod = async (array: number[], compare: (a: number, b: number) => boolean) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        if (compare(array[j + 1], array[j])) {
          swap(array, j + 1, j)
        }
      }
    }
    return array;
  }

  const handlerClick = async (direction: string) => {
    const compare = direction === Direction.Ascending ? compareGreater : compareLower;
    if (sortingName === "selection-sort") {
      setRandomArray([...await sortArraySelectMethod(randomArray, compare)])
    }
    else {
      setRandomArray([...await sortArrayBubbleMethod(randomArray, compare)])
    }
  }

  const [randomArray, setRandomArray] = useState<number[]>(getRandomArray());

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles["radio-inputs"]}>
          <RadioInput label={"Выбор"} name={"sorting-name"} value={"selection-sort"} defaultChecked onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e, setSortingName)} />
          <RadioInput label={"Пузырёк"} name={"sorting-name"} value={"bubble-sort"} onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e, setSortingName)} />
        </div>

        <div className={styles["button-direction"]}>
          <Button text={"По возрастанию"} sorting={Direction.Ascending} onClick={() => handlerClick(Direction.Ascending)} />
          <Button text={"По убыванию"} sorting={Direction.Descending} onClick={() => handlerClick(Direction.Descending)} />
        </div>

        <Button text={"Новый массив"} onClick={() => setRandomArray(getRandomArray())} />
      </div>
      <div className={styles.columns}>
        {randomArray.map((el, index) => <Column key={index} index={el} state={getClassName(currentIndex, index)} />)}
      </div>
    </SolutionLayout>
  );
};
