const getRandomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const getRandomArray = (): number[] => {
    const countElements: number = getRandomNumber(3, 17);
    const array: number[] = [];
    for (let i = 0; i < countElements; i++) {
        array.push(getRandomNumber(0, 100));
    }
    return array
}

export const compareLower = (a: number, b: number): boolean => {
    return a < b
}

export const compareGreater = (a: number, b: number): boolean => {
    return a > b
}