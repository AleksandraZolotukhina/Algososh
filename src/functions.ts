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