import "./styles.scss";
import {ToDoItem, TodoItemData} from "./class/ToDoItem";
import {ToDoList} from "./class/ToDoList";
import "os-ui-components/main.js"


const todoItems: TodoItemData[] = [
    {
        id: "1",
        task: "Take out trash",
        complete: "incomplete",
        priority: "low", // Add priority
        description: "Take the trash out to the curb for pickup",
        index: 0
    },
    {
        id: "2",
        task: "Do laundry",
        complete: "incomplete",
        priority: "medium", // Add priority
        description: "Wash, dry, and fold the laundry",
        index: 1
    },
    {
        id: "3",
        task: "Walk the dog TODO",
        complete: "incomplete",
        priority: "high", // Add priority
        description: "Take the dog for a 30-minute walk around the neighborhood",
        index: 2
    },
    {
        id: "4",
        task: "Walk the dog OLD",
        complete: "complete",
        priority: "high", // Add priority
        description: "Take the dog for a 30-minute walk around the neighborhood",
        index: 3
    },
    {
        id: "5",
        task: "Do laundry again",
        complete: "incomplete",
        priority: "low", // Add priority
        description: "Wash, dry, and fold the laundry",
        index: 4
    },
]
const todoList = new ToDoList('#todoList');
todoItems.forEach((item: TodoItemData) => {
    todoList.addTask(item);
})

console.log({todoList})
