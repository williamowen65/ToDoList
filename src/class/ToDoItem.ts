export type TodoItemData = {
    id: string;
    task: string;
    complete: string;
}

export class ToDoItem {
    id: number;
    task: string;
    complete: boolean;
    htmlNode: HTMLElement;

    constructor(data: TodoItemData, htmlNode: HTMLElement) {
       
        this.id = ToDoItem.processId(data.id);
        this.task = ToDoItem.processTask(data.task);
        this.complete = ToDoItem.processComplete(data.complete);
        this.htmlNode = htmlNode;

        const expandBtn = this.htmlNode.querySelector('.expandBtn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => this.expandItem());
        }

       this.addToDom()
    }
    

    printDetails(): void {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }

    static processTask(task: string): string {
        return task.toLowerCase().trim();
    }

    static processId(id: string): number {
        return parseInt(id);
    }

    static processComplete(complete: string): boolean {
        return complete === "complete";
    }

    public expandItem(): void {
        console.log(`Expanded: ${this.task}`);
        this.htmlNode.style.height = "auto";
        this.htmlNode.querySelector('textarea').style.height = "100%";
        // this.htmlNode.style.whiteSpace = "normal";
    }
    
    public addToDom(): void {
        const list = document.querySelector('#todoList');
        if (list) {
            list.appendChild(this.htmlNode);
        }
    }
}