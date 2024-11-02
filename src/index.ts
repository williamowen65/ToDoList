import "./styles.scss";
import {ToDoItem, TodoItemData} from "./class/ToDoItem";


const todoItems: TodoItemData[] = [
    {
        id: "1",
        task: "Take out trash",
        complete: "incomplete",
        priority: "low" // Add priority
    },
    {
        id: "2",
        task: "Do laundry",
        complete: "incomplete",
        priority: "medium" // Add priority
    },
    {
        id: "3",
        task: "Walk the dog",
        complete: "incomplete",
        priority: "high" // Add priority
    },
    {
        id: "4",
        task: "Walk the dog",
        complete: "complete",
        priority: "high" // Add priority
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
            const listItem = ToDoItem.createTodoItem(item, (todoElement as HTMLElement));
            ToDoItemInstances[item.id] = listItem;
        }
    });

}
