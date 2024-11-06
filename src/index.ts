import "./styles.scss";
import {ToDoItem, TodoItemData} from "./class/ToDoItem";
import {ToDoList} from "./class/ToDoList";
import "os-ui-components/main.js"
import {todoItems, quotes} from './data'



const todoList = new ToDoList('#todoList');
todoItems.forEach((item: TodoItemData) => {
    todoList.addTask(item);
})

setQuotes()
function setQuotes(){

    Object.keys(quotes).forEach((key: "completed" | "not-completed") => {
        let quoteIndex = Math.floor(Math.random() * quotes[key].length);
        console.log({key, quoteIndex});
        const quoteElement = document.querySelector(`#${key} .quote`) as HTMLElement;
            const theQuotes = quotes[key]
        
            const template = `
                <div class="quote-text">"
                    ${ quotes[key][quoteIndex].text}
                     "
                </div>
                <small>- ${quotes[key][quoteIndex].author}</small>
            `;
        quoteElement.innerHTML = template;
    })
}



console.log({todoList});
