import { LinkedListNode } from "./class-linked-list-node";

interface ILinkedList<T> {
    append: (element: T) => void;
    prepend: (element: T) => void;
    deleteHead: () => void;
    deleteTail: () => void;
    addByIndex: (value: string, index: number) => void;
    deleteByIndex: (index: number) => void;
    toArray: () => string[];
    getSize: () => number;
}

export class LinkedList<T> implements ILinkedList<T> {
    private head: any;
    private tail: any;
    private size: number;

    constructor(head: string[] | null = null) {
        this.head = null;
        this.tail = null;
        this.size = 0;

        if (head !== null) {
            head.forEach(value => {
                this.append(value)
            })
        }

    }
    prepend(value: any): void {
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
    append(value: any): void {
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
    deleteHead(): void {
        this.head = this.head.next;
        this.size--;
    }
    deleteTail(): void {
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

    addByIndex(value: string, index: number): void {
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

    deleteByIndex(index: number): void {
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

    toArray(): string[] {
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