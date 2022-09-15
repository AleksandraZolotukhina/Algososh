import { ChangeEvent, SetStateAction } from "react";

export const swap = (array: number[] | string[], curIndex: number, nextIndex: number) => {
  let current = array[curIndex];
  array[curIndex] = array[nextIndex];
  array[nextIndex] = current;
}

export const handlerChange = (e: ChangeEvent<HTMLInputElement>, setInput: { (value: SetStateAction<string>): void }) => {
  setInput((e.target as HTMLInputElement).value)
}

export const setTimer = (time: number) => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time)
  })
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomArray = (minElement:number, maxElement:number, minSize:number, maxSize:number): number[] => {
  const countElements: number = getRandomNumber(minElement, maxElement);
  const array: number[] = [];
  for (let i = 0; i < countElements; i++) {
    array.push(getRandomNumber(minSize, maxSize));
  }
  return array
}