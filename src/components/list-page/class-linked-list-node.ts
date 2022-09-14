export class LinkedListNode<T> {
  value: T;
  next: any;
  constructor(value: T, next?: any) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}