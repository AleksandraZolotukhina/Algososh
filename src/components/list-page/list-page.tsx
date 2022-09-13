import React, { Fragment, useState } from "react";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import structure from "../data-structure.module.css";
import circles from "../wrapper-circles.module.css";
import styles from "./list-page.module.css";
import { ArrowIcon } from "../ui/icons/arrow-icon";
class LinkedListNode {
  value: any;
  next: any;
  constructor(value: any, next?: any) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

class LinkedList {
  private head: any;
  private tail: any;
  private size: any;
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
  prepend(value: any) {
    const node = new LinkedListNode(value);
    if (this.size === 0) {
      this.tail = node;
    }
    else {
      let cur = this.head;
      while (cur.next) {
        cur = cur.next
      }
      this.tail = cur;
    }
    node.next = this.head;
    this.head = node;

    this.size++;
  }
  append(value: any) {
    const node = new LinkedListNode(value);
    if (this.size === 0) {
      this.head = node;
      this.tail = node;
    }
    else {
      this.tail.next = node;
      this.tail = node;
    }
    this.size++;
  }
  deleteHead() {
    this.head = this.head.next;
    this.size--;
  }
  deleteTail() {
    if (this.size === 1) {
      this.head = null;
      this.tail = null;
      this.size--;
      return
    }
    let cur = this.head;
    let index = 0;
    while (index < this.size - 2) {
      cur = cur.next;
      index++;
    }
    cur.next = null;
    this.tail = cur;
    this.size--;
  }

  addByIndex(value: string, index: number) {
    const node = new LinkedListNode(value);
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let cur = this.head;
      let curIndex = 0;
      while (curIndex < index - 1) {
        cur = cur.next;
        curIndex++;
      }
      node.next = cur.next;
      cur.next = node;
    }
    this.size++;
  }

  deleteByIndex(index: number) {
    if (index === 0) {
      this.head = this.head.next;
    }
    else {
      let cur = this.head;
      let curIndex = 0;
      while (curIndex < index - 1) {
        cur = cur.next;
        curIndex++;
      }
      cur.next = cur.next.next;
    }
    this.size--;
  }

  toArray() {
    let cur = this.head;
    const array = [];
    while (cur) {
      array.push(cur.value);
      cur = cur.next;
    }
    return array;
  }

  getSize() {
    return this.size;
  }
}
export const ListPage: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [index, setIndex] = useState<string>("");
  const [list] = useState(new LinkedList());
  const [array, setArray] = useState<string[]>(["0", "34", "8", "1"]);
  const getSmallCircles = (value: string | undefined, index: number| undefined, size: number) => {
    const array = Array(size).fill(undefined);
    if(index!==undefined){
      array[index] = value;
    }
    return array;
  }
  return (
    <SolutionLayout title="Связный список">
      <div className={`${structure.actions} ${styles.actions}`}>
        <Input isLimitText={true} type={"number"} max={19} value={input} onChange={(e) => setInput((e.target as HTMLInputElement).value)} />
        <Button text={"Добавить в head"} onClick={() => { list.prepend(input); setArray([...list.toArray()]); getSmallCircles(input, 0, list.getSize()) } } />
        <Button text={"Добавить в tail"} onClick={() => { list.append(input); setArray([...list.toArray()]) }} />
        <Button text={"Удалить из head"} onClick={() => { list.deleteHead(); setArray([...list.toArray()]) }} />
        <Button text={"Удалить из tail"} onClick={() => { list.deleteTail(); setArray([...list.toArray()]) }} />
      </div>
      <div className={`${structure.actions} ${styles.actions}`}>
        <Input isLimitText={true} type={"number"} max={19} value={index} onChange={(e) => setIndex((e.target as HTMLInputElement).value)} />
        <Button text={"Добавить по индексу"} onClick={() => { list.addByIndex(input, Number(index)); setArray([...list.toArray()]) }} />
        <Button text={"Удалить по индексу"} onClick={() => { list.deleteByIndex(Number(index)); setArray([...list.toArray()]) }} />
      </div>
      <div className={circles.wrapper}>
        {
          getSmallCircles(undefined,undefined,array.length).map((el:string,index:number)=>{
            <Circle letter={el} index={index} />
          })
        }
        {array.map((el: string, index: number) => {
          return (
            <Fragment key={index}>
              <Circle letter={el} index={index} head={index === 0 ? "head" : ""} tail={index === array.length - 1 ? "tail" : ""} />
              {index < array.length - 1 ? <ArrowIcon /> : <></>}
            </Fragment>
          )
        })
        }
      </div>
    </SolutionLayout>
  );
};