import { swap } from "../../functions"

export const compareLower = (a: number, b: number): boolean => {
    return a < b
}

export const compareGreater = (a: number, b: number): boolean => {
    return a > b
}

export const sortArrayBubbleMethod = (array: number[], compare: (a: number, b: number) => boolean) => {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (compare(array[j + 1], array[j])) {
                swap(array, j + 1, j);
            }
        }
    }
    return array
}

export const sortArraySelectMethod = (array: number[], compare: (a: number, b: number) => boolean) => {
    let index;
    for (let i = 0; i < array.length - 1; i++) {
      index = i;
      for (let j = i; j < array.length - 1; j++) {
        if (compare(array[index], array[j + 1])) {
          index = j + 1;
        }
      }
      swap(array, i, index);
    }
    return array
  }