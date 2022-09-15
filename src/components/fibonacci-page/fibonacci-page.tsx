import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import circles from "../wrapper-circles.module.css";

export const FibonacciPage: React.FC = () => {

  const [number, setNumber] = useState<number>(0);
  const [fibonacciNumbers, setFibonacciNumbers] = useState<number[]>([]);
  const [arrayMapping, setArrayMapping] = useState<number>(-1);

  const getFibonacciNumbers = (n: number): Array<number> => {
    const array = [0, 1];
    for (let i = 2; i <= n; i++) {
      array[i] = array[i - 1] + array[i - 2];
    }
    return array
  }

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fibonacciNumbers.length) {
        setArrayMapping(index++);
      }
      else {
        clearInterval(timer);
      }
    }, 500)
  }, [fibonacciNumbers])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.form}>
        <Input
          type={"number"}
          isLimitText={true}
          max={19}
          onChange={(e) => setNumber(Number((e.target as HTMLInputElement).value))}
        />
        <Button
          text={"Рассчитать"}
          isLoader={arrayMapping + 1 !== fibonacciNumbers.length}
          disabled={number >= 1 && number <= 19 ? false : true}
          onClick={() => setFibonacciNumbers(getFibonacciNumbers(number))}
        />
      </div>
      <div className={circles.wrapper}>
        {
          fibonacciNumbers.slice(0, arrayMapping + 1).map((number, index) =>
            <Circle
              letter={String(number)}
              index={index}
              key={index} 
            />
          )
        }
      </div>
    </SolutionLayout>
  );
};
