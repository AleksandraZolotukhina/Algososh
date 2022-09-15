interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    getPeak: () => number;
    getSize: () => number;
    getStack: () => T[];
}

export class Stack<T> implements IStack<T> {
    private container: T[] = [];

    push(item: T): void {
        this.container.push(item);
    };

    pop(): void {
        this.container.pop();
    };

    getPeak(): number {
        return this.getSize() - 1;
    };

    getSize(): number {
        return this.container.length
    };
    clear() {
        this.container = [];
    }
    getStack(): T[] {
        return this.container;
    }
}