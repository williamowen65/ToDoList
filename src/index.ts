import "./styles.scss";
import {ToDoItem, TodoItemData} from "./class/ToDoItem";
import {ToDoList} from "./class/ToDoList";
import "os-ui-components/main.js"
import {todoItems, quotes} from './data'



const todoList = new ToDoList('#todoList');
todoItems.forEach((item: TodoItemData) => {
    todoList.addTask(item);
})

console.log({todoList})
