import { ToDoItem, TodoItemData } from "./ToDoItem";
import AddToDoHtml from "./AddToDo.html";

export class ToDoList {
    private tasks: TodoItemData[];
    list: HTMLElement;
    ToDoItemInstances: { [key: string]: ToDoItem } = {}

    constructor(listSelector: string) {
        this.tasks = [];
        this.list = document.querySelector(listSelector) as HTMLElement

        if (this.list && this.tasks.length > 0) {

        }

        //Extract to method "setting up event listeners"
        this.list.addEventListener('click', (event) => {
            let target = event.target as HTMLElement;
            if (target.closest("input[type='checkbox']")) {
                const listSection = target.closest('.list-section')
                // Check if any of the checkboxes are checked
                const checkboxes = listSection.querySelectorAll("input[type='checkbox']") as NodeListOf<HTMLInputElement>;
                const checked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
                const actionBtn = listSection.querySelector("button") as HTMLButtonElement;
                if (checked) {
                    actionBtn.disabled = false;
                } else {
                    actionBtn.disabled = true;
                }

                console.log('checkbox clicked', { actionBtn });
            }
        })

        // Add html to the page for add TodoItem
        console.log({ AddToDoHtml })
        document.querySelector(".createTodo").insertAdjacentHTML('afterbegin', AddToDoHtml);
        // on click button#btnAddTodo set open class on #AddToDo    
        const btnAddTodo = document.querySelector('#btnAddTodo') as HTMLElement;
        const AddToDo = document.querySelector('#AddToDo') as HTMLElement;
        btnAddTodo.addEventListener('click', () => {
            if (AddToDo.classList.contains('open')) {
                AddToDo.classList.add('fadeOut');
                setTimeout(() => {
                    AddToDo.classList.remove('open');
                    AddToDo.classList.remove('fadeOut');
                }, 4000);
            } else {
                AddToDo.classList.add('fadeIn');
                AddToDo.classList.add('open');
                setTimeout(()=>{
                    AddToDo.classList.remove('fadeIn');
                }, 1000)
            }
        });

        // Close add todo form
        const closeAddToDo = document.querySelector('#AddToDo .close') as HTMLElement;
        closeAddToDo.addEventListener('click', () => {
            AddToDo.classList.add('fadeOut');
            setTimeout(() => {
                AddToDo.classList.remove('open');
                AddToDo.classList.remove('fadeOut');
            }, 4000);
        });

        // Submit new todo item
        const form = document.querySelector('#AddToDo form') as HTMLFormElement;
        form.addEventListener('submit', (event) => {
           
            event.preventDefault();
            const formData = new FormData(form);
            const newTask: TodoItemData = {
                id: Math.random().toString(36).substr(2, 9),
                index: this.tasks.length,
                description: formData.get('description') as string,
                priority: formData.get('priority') as string,
                complete: 'incomplete',
                task: formData.get('task') as string
            };
            console.log('form submitted', {newTask});
            this.addTask(newTask);
            form.reset();
            AddToDo.classList.add('fadeOut');
            setTimeout(() => {
                AddToDo.classList.remove('open');
                AddToDo.classList.remove('fadeOut');
            }, 4000);
        });
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