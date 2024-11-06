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


/// Hack reacting to screen window size
function setVhProperty() {
    // This code sets a global css variable to the height of the window
    let vh = window.innerHeight;
    // calculateOffset
    let offset = ((vh * 0.35)) + 0; // @TODO Calculate this function manually
    // 
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--offset', `${offset}px`);
}

// Set the --vh property on load
setVhProperty();

// Update the --vh property on resize
window.addEventListener('resize', setVhProperty);
window.addEventListener('load', setVhProperty);
