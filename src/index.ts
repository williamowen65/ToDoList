import "./styles.scss";
import {ToDoItem, TodoItemData} from "./class/ToDoItem";


const todoItems : TodoItemData[] = [
    {
        id: "1",
        task: "Take out trash",
        complete: "incomplete"
    },
    {
        id: "2",
        task: "Do laundry",
        complete: "incomplete"
    },
    {
        id: "3",
        task: "Walk the dog",
        complete: "incomplete"
    }
];
// const todoItemNodes = document.querySelectorAll('.todoItem');
const ToDoItemInstances: { [key: string]: ToDoItem } = {};


const list = document.querySelector('#todoList');
if (list) {
    todoItems.forEach((item: TodoItemData) => {
        const template = document.querySelector("#todo-template") as HTMLTemplateElement;
        if (template) {
            const todoElement = (template.content.cloneNode(true) as HTMLElement).querySelector(".todo");
            console.log({todoElement});
            const listItem = new ToDoItem(item, (todoElement as HTMLElement));
            ToDoItemInstances[item.id] = listItem;
        }
    });

}
