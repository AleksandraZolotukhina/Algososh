import React, { Fragment, useEffect, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import structure from "../data-structure.module.css";
import circles from "../wrapper-circles.module.css";
import styles from "./list-page.module.css";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { setTimer } from "../../functions";
import { ElementStates } from "../../types/element-states";
import { LinkedList } from "./class-linked-list";

export const ListPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [list] = useState(new LinkedList(["0", "34", "8", "1"]));
  const [array, setArray] = useState<string[] | undefined[]>(["0", "34", "8", "1"]);
  const [smallCircles, setSmallCircles] = useState<[{ value: string, index: number }]>([{ value: "0", index: -1 }]);
  const [indexPinkCircle, setIndexPinkCircle] = useState<number>(-1);
  const [indexGreenCircle, setIndexGreenCircle] = useState<number>(-1);
  const [isBottomElement, setIsBottomElement] = useState<boolean>(false);

  const addHead = () => {
    setSmallCircles([{ value: input, index: 0 }]) //отрисовываем новый элемент
    list.prepend(input);
  }

  const addTail = () => {
    setSmallCircles([{ value: input, index: list.getSize() - 1 }]) //отрисовываем новый элемент
    list.append(input);
  }

  const addElement = async (add: () => void, index: number) => {
    add();
    setIsBottomElement(false);
    await setTimer(500);

    setSmallCircles([{ value: input, index: -1 }]) //удаляем отрисованный новый элемент
    setArray([...list.toArray()]); //добавляем в массив новый элемент
    setIndexGreenCircle(index); //выделяем зеленым, что добавили новый элемент
    await setTimer(500);

    setIndexGreenCircle(-1); //убираем выделение цвета, что добавили новый элемент
  }
  const deleteHead = () => {
    list.deleteHead()
  }

  const deleteTail = () => {
    list.deleteTail()
  }

  const deleteElement = async (func: () => void, index: number) => {
    setSmallCircles([{ value: array[index] as string, index: index }])
    array.splice(index, 1, undefined);
    setArray([...array] as string[]);
    func(); // удаляем элемент
    await setTimer(500);

    array.splice(index, 1);
    setArray([...array] as string[]);
    setSmallCircles([{ value: input, index: -1 }]) // убираем новый отрисованный элемент
    setIsBottomElement(false)
  }

  const deleteByIndex = async (index: number) => {
    setIsBottomElement(true);
    let curIndex = 0;
    while (curIndex <= Number(index) + 1) {
      setIndexPinkCircle(curIndex);
      await setTimer(500);
      curIndex++;
    }
    setSmallCircles([{ value: array[index] as string, index: index }])


    array.splice(index, 1, undefined);
    setArray([...array] as string[]);
    await setTimer(500);

    setIndexPinkCircle(-1);
    setSmallCircles([{ value: input, index: -1 }]) // убираем новый элемент
    list.deleteByIndex(index);
    setArray([...list.toArray()])
  }

  const addByIndex = async () => {
    list.addByIndex(input, Number(index));
    let curIndex = 0;
    let state;
    while (curIndex <= Number(index) + 1) {
      state = smallCircles.splice(0, 1, { value: input, index: curIndex });
      setSmallCircles([...state] as [{ value: string, index: number }]); //отрисовываем новый элемент
      await setTimer(500);

      setIndexPinkCircle(curIndex);
      curIndex++;
    }

    setIndexPinkCircle(-1); // убираем розовый цвет
    setSmallCircles([{ value: input, index: -1 }]) // убираем новый элемент
    setArray([...list.toArray()]) // добавляем новый эелемент в массив
    setIndexGreenCircle(Number(index)); //выделяем зеленым, что добавили новый элемент
    await setTimer(500);
    setIndexGreenCircle(-1); //убираем выделение цвета, что добавили новый элемент
  }

  const getColorCircle = (index: number) => {
    if (index < indexPinkCircle) {
      return ElementStates.Changing;
    }
    if (index === indexGreenCircle) {
      return ElementStates.Modified;
    }
    return ElementStates.Default;
  }

  return (
    <SolutionLayout title="Связный список">
      <div className={`${structure.actions} ${styles.actions}`}>
        <Input isLimitText={true} type={"number"} max={19} value={input} onChange={(e) => setInput((e.target as HTMLInputElement).value)} />
        <Button text={"Добавить в head"} onClick={() => addElement(addHead, 0)} />
        <Button text={"Добавить в tail"} onClick={() => addElement(addTail, list.getSize())} />
        <Button text={"Удалить из head"} onClick={() => { setIsBottomElement(true); deleteElement(deleteHead, 0) }} />
        <Button text={"Удалить из tail"} onClick={() => { setIsBottomElement(true); deleteElement(deleteTail, list.getSize() - 1) }} />
      </div>
      <div className={`${structure.actions} ${styles.actions}`}>
        <Input isLimitText={true} type={"number"} max={19} value={index} onChange={(e) => setIndex((e.target as HTMLInputElement).value)} />
        <Button text={"Добавить по индексу"} onClick={() => addByIndex()} />
        <Button text={"Удалить по индексу"} onClick={() => deleteByIndex(Number(index))} />
      </div>
      <div className={circles.wrapper} style={{ justifyContent: "flex-start", position: "relative" }}>
        {

          smallCircles.map(el => {
            let marginLeft = `calc(((100% - 136px*${array.length - 1} - 80px)/2) + 14px + ${el.index}*136px)`;
            return el.index !== -1 ?
              <div key={el.index} style={{ zIndex: "2", position: "absolute", marginTop: 0, marginLeft: marginLeft, top: isBottomElement ? '162px' : '-16px' }}>
                <Circle letter={el.value} isSmall={true} state={ElementStates.Changing} />
              </div> :
              <></>
          })
        }
      </div>
      <div className={circles.wrapper}>
        {array.map((el: string | undefined, index: number) => {
          return (
            <Fragment key={index}>
              <Circle letter={el} state={getColorCircle(index)} index={index} head={index === 0 ? "head" : ""} tail={index === array.length - 1 ? "tail" : ""} />
              {index < array.length - 1 ? <ArrowIcon /> : <></>}
            </Fragment>
          )
        })
        }
      </div>
    </SolutionLayout>
  );
};