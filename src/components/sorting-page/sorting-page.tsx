import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { Column } from "../ui/column/column";
import { swap } from "../../functions";

export const SortingPage: React.FC = () => {
  const [sortingName, setSortingName] = useState<string>("selection-sort");

  const handlerChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingName((e.target as HTMLInputElement).value)
  }

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

  const sortArraySelectMethod = (array: number[], compare: (a: number, b: number) => boolean) => {
    let index;
    for (let i = 0; i < array.length - 1; i++) {
      index = i;
      for (let j = i; j < array.length; j++) {
        if (compare(array[index], array[j + 1])) {
          index = j + 1;
        }
      }
      swap(array, i, index);
    }
    return array
  }

  const sortArrayBubbleMethod = (array: number[], compare: (a: number, b: number) => boolean) => {
    for (let end = array.length; end > 0; end--) {
      for (let i = 0; i < end; i++) {
        if (compare(array[i], array[i + 1])) {
          swap(array, i, i + 1);
        }
      }
    }
    return array;
  }

  const handlerClick = (direction: string) => {
    const compare = direction === Direction.Ascending ? compareGreater : compareLower;
    if (sortingName === "selection-sort") {
      setRandomArray([...sortArraySelectMethod(randomArray, compare)])
    }
    else {
      setRandomArray([...sortArrayBubbleMethod(randomArray, compare)])
    }
  }

  const [randomArray, setRandomArray] = useState<number[]>(getRandomArray());

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles["radio-inputs"]}>
          <RadioInput label={"Выбор"} name={"sorting-name"} value={"selection-sort"} defaultChecked onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e)} />
          <RadioInput label={"Пузырёк"} name={"sorting-name"} value={"bubble-sort"} onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e)} />
        </div>

        <div className={styles["button-direction"]}>
          <Button text={"По возрастанию"} sorting={Direction.Ascending} onClick={() => handlerClick(Direction.Ascending)} />
          <Button text={"По убыванию"} sorting={Direction.Descending} onClick={() => handlerClick(Direction.Descending)} />
        </div>

        <Button text={"Новый массив"} onClick={() => setRandomArray(getRandomArray())} />
      </div>
      <div className={styles.columns}>
        {randomArray.map((el, index) => <Column key={index} index={el} />)}
      </div>
    </SolutionLayout>
  );
};
