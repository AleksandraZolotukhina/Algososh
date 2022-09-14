interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | undefined;
}

export class Queue<T> implements IQueue<T> {
    private container: T[] | undefined[] = [];
    private head: number = 0;
    private tail: number = 0;
    private length: number = 0;
    private readonly size: number = 0;

    constructor(size: number) {
        this.size = size;
        this.container = Array(size).fill(undefined);
    }

    enqueue(item: T): void {
        if (this.tail === this.size) {
            this.tail = 0;
        }
        this.container[this.tail % this.size] = item;
        this.tail++;
        this.length++;
    }

    dequeue(): void {
        this.container[this.head % this.size] = undefined;

        this.head = this.head + 1 === this.size ? 0 : this.head + 1;
        this.length--;
    }
    clear() {
        this.container = Array(this.size).fill(undefined);
        this.tail = 0;
        this.head = 0;
        this.length = 0;
    }
    peak(): T | undefined {
        return this.container[this.head]
    }

    getQueue(): T[] | undefined[] {
        return this.container
    }

    getHead(): number {
        return this.head
    }

    getTail(): number {
        return this.tail
    }

    getLength(): number {
        return this.length
    }
    getSize(): number {
        return this.size
    }
}


