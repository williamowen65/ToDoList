import "./styles.scss";
import {ToDoItem, TodoItemData} from "./class/ToDoItem";
import {ToDoList} from "./class/ToDoList";
import "os-ui-components/main.js"


const todoItems: TodoItemData[] = [
    {
        id: "1",
        task: "Take out trash",
        complete: "incomplete",
        priority: "low",
        description: "Take the trash out to the curb for pickup",
        index: 0
    },
    {
        id: "2",
        task: "Do laundry",
        complete: "incomplete",
        priority: "medium",
        description: "Wash, dry, and fold the laundry",
        index: 1
    },
    {
        id: "3",
        task: "Walk the dog",
        complete: "incomplete",
        priority: "high",
        description: "Take the dog for a 30-minute walk around the neighborhood",
        index: 2
    },
    {
        id: "4",
        task: "Grocery shopping",
        complete: "complete",
        priority: "medium",
        description: "Buy groceries for the week",
        index: 3
    },
    {
        id: "5",
        task: "Clean the house",
        complete: "incomplete",
        priority: "high",
        description: "Vacuum, dust, and mop the entire house",
        index: 4
    },
    {
        id: "6",
        task: "Pay bills",
        complete: "complete",
        priority: "high",
        description: "Pay electricity, water, and internet bills",
        index: 5
    },
    {
        id: "7",
        task: "Read a book",
        complete: "incomplete",
        priority: "low",
        description: "Read at least 50 pages of a book",
        index: 6
    },
    {
        id: "8",
        task: "Exercise",
        complete: "incomplete",
        priority: "medium",
        description: "Do a 30-minute workout",
        index: 7
    },
    {
        id: "9",
        task: "Call parents",
        complete: "complete",
        priority: "low",
        description: "Have a 1-hour conversation with parents",
        index: 8
    },
    {
        id: "10",
        task: "Plan vacation",
        complete: "incomplete",
        priority: "medium",
        description: "Plan the itinerary for the upcoming vacation",
        index: 9
    }
];
const todoList = new ToDoList('#todoList');
todoItems.forEach((item: TodoItemData) => {
    todoList.addTask(item);
})

console.log({todoList})
