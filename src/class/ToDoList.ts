import { ToDoItem, TodoItemData } from "./ToDoItem";

export class ToDoList {
    private tasks: TodoItemData[];
    list: HTMLElement;
    ToDoItemInstances: { [key: string]: ToDoItem } = {}

    constructor(listSelector: string) {
        this.tasks = [];
        this.list = document.querySelector(listSelector) as HTMLElement

        if (this.list && this.tasks.length > 0) {

        }
    }

    addTask(task: TodoItemData): void {
        this.tasks.push(task);
        this.tasks.sort(this.compoundSort);
        this.ToDoItemInstances[task.id] = ToDoItem.createTodoItem(task);
    }

    removeTask(task: TodoItemData): void {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }
    }

    getTasks(): TodoItemData[] {
        return this.tasks;
    }

    /**
     * Compares two TodoItemData objects based on their priority and index.
     * 
     * @param a - The first TodoItemData object to compare.
     * @param b - The second TodoItemData object to compare.
     * @returns A negative number if a should come before b, a positive number if a should come after b, or 0 if they are equal.
     */
    private compoundSort(a: TodoItemData, b: TodoItemData): number {
        const priorityOrder = { 'high': 1, 'medium': 2, 'low': 3 };

        // Compare by priority
        //@ts-ignore
        const priorityComparison = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityComparison !== 0) {
            return priorityComparison;
        }

        // If priorities are equal, compare by index
        return a.index - b.index;
    }
}

export default ToDoList;