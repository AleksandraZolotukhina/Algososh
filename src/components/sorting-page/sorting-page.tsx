import React, { ChangeEvent, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import styles from "./sorting-page.module.css";
import { v4 as key } from 'uuid';
import { Column } from "../ui/column/column";
import { getRandomArray, handlerChange, setTimer, swap } from "../../functions";
import { ElementStates } from "../../types/element-states";
import { compareGreater, compareLower } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortingName, setSortingName] = useState<string>("selection-sort");
  const [currentIndex, setCurrentIndex] = useState<number>(-2);
  const [counter, setCounter] = useState<number>(-2);
  const [randomArray, setRandomArray] = useState<number[]>(getRandomArray(3, 17, 0, 100));
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [direction, setDirection] = useState<string>("");

  const sortArraySelectMethod = async (array: number[], compare: (a: number, b: number) => boolean) => {
    setIsLoading(true);
    setDisabled(true);
    setCounter(-2);
    let index;
    for (let i = 0; i < array.length - 1; i++) {
      index = i;
      setCurrentIndex(index);
      setCounter(i);
      await setTimer(500);
      for (let j = i; j < array.length - 1; j++) {
        setCounter(j + 1);
        await setTimer(500);
        if (compare(array[index], array[j + 1])) {
          index = j + 1;
        }
      }
      swap(array, i, index);
    }
    setCurrentIndex((index) => index + 2);
    await setTimer(500);
    setIsLoading(false);
    setDisabled(false);
    setCounter(array.length + 1);
    return array
  }

  const sortArrayBubbleMethod = async (array: number[], compare: (a: number, b: number) => boolean) => {
    setIsLoading(true);
    setDisabled(true);
    setCounter(-2);
    for (let i = 0; i < array.length; i++) {
      setCounter(i);
      for (let j = 0; j < array.length - i - 1; j++) {
        setCurrentIndex(j);
        await setTimer(500);
        if (compare(array[j + 1], array[j])) {
          swap(array, j + 1, j);
        }
      }
    }
    setCurrentIndex(-2);
    setCounter(array.length + 1);
    await setTimer(500);
    setIsLoading(false);
    setDisabled(false);
    return array
  }

  const handlerClick = async (direction: string) => {
    setDirection(direction);
    const compare = direction === Direction.Ascending ? compareGreater : compareLower;
    if (sortingName === "selection-sort") {
      setRandomArray([...await sortArraySelectMethod(randomArray, compare)]);
    }
    else {
      setRandomArray([...await sortArrayBubbleMethod(randomArray, compare)]);
    }
  }

  const getColorColumn = (indexElement: number) => {
    if (sortingName === "bubble-sort") {
      if (indexElement === currentIndex || indexElement === currentIndex + 1) {
        return ElementStates.Changing
      }
      else if (indexElement >= randomArray.length - counter) {
        return ElementStates.Modified
      }
      return ElementStates.Default
    }

    if (sortingName === "selection-sort") {
      if (indexElement < currentIndex) {
        return ElementStates.Modified
      }
      else if (indexElement === currentIndex || counter === indexElement) {
        return ElementStates.Changing
      }
      return ElementStates.Default
    }
  }

  const isDisabled = () => {
    if (direction !== Direction.Ascending && disabled) {
      return true
    }
    else if (direction !== Direction.Descending && disabled) {
      return true
    }
    return false
  }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.wrapper}>
        <div className={styles["radio-inputs"]}>
          <RadioInput
            label={"Выбор"}
            name={"sorting-name"}
            disabled={disabled}
            value={"selection-sort"}
            defaultChecked
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e, setSortingName)}
          />
          <RadioInput
            label={"Пузырёк"}
            name={"sorting-name"}
            disabled={disabled}
            value={"bubble-sort"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handlerChange(e, setSortingName)}
          />
        </div>

        <div className={styles["button-direction"]}>
          <Button
            text={"По возрастанию"}
            disabled={isDisabled()}
            isLoader={direction === Direction.Ascending && isLoading ? true : false}
            sorting={Direction.Ascending} onClick={() => handlerClick(Direction.Ascending)}
          />
          <Button
            text={"По убыванию"}
            disabled={isDisabled()}
            isLoader={direction === Direction.Descending && isLoading ? true : false}
            sorting={Direction.Descending} onClick={() => handlerClick(Direction.Descending)}
          />
        </div>
        <Button
          text={"Новый массив"}
          disabled={disabled}
          onClick={() => {
            setCurrentIndex(-2);
            setCounter(-2);
            setRandomArray(getRandomArray(3, 17, 0, 100))
          }}
        />
      </div>

      <div className={styles.columns}>
        {randomArray.map((el, index) => <Column key={key()} index={el} state={getColorColumn(index)} />)}
      </div>
    </SolutionLayout>
  );
};
