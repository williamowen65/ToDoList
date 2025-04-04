import $ from 'jquery';
import "select2"
import toDo_html from './ToDoItem.html';
import { TemplateEngine } from '../utils/TemplateEngine';



export type TodoItemData = {
    id: string;
    task: string;
    complete: string;
    priority: string;
    description: string;
    index?: number;
}

export class ToDoItem {
    id: number;
    task: string;
    complete: boolean;
    priority: string; // Add priority property
    htmlNode: HTMLElement;
    description: string;
    index: number

    constructor(data: TodoItemData, htmlNode: HTMLElement) {
        this.id = ToDoItem.processId(data.id);
        this.task = ToDoItem.processTask(data.task);
        this.complete = ToDoItem.processComplete(data.complete);
        this.priority = data.priority; // Set priority
        this.htmlNode = htmlNode;
        this.description = ToDoItem.processDescription(data.description);
        this.index = data.index;;


        this.addToDom();
        this.updatePriorityDisplay(); // Update priority display

        this.setListeners(); // userSetPriority
    }

    public setListeners(): void {
        // Add event listener for the priority select element
        const priorityElement = this.htmlNode.querySelector('select.priority') as HTMLSelectElement;
        if (priorityElement) {
            priorityElement.addEventListener('change', (event) => {
                const target = event.target as HTMLSelectElement;
                this.priority = target.value;
            });
        }

        // delete a todo item
        const deleteBtn = this.htmlNode.querySelector('.deleteBtn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.htmlNode.remove();
            });
        }


        const expandBtn = this.htmlNode.querySelector('.expandBtn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => this.toggleItem());
        }

        const toDoDetailsBtn = this.htmlNode.querySelector('.detailsBtn');
        if (toDoDetailsBtn) {
            toDoDetailsBtn.addEventListener('click', () => this.toggleItem());
        }

        // listener on sidemenu-toggle button to open and close the side menu
        const sideMenuToggle = this.htmlNode.querySelector('.sidemenu-toggle');
        if (sideMenuToggle) {
            console.log({sideMenuToggle})
            sideMenuToggle.addEventListener('click', () => {
                const sideMenu = this.htmlNode.querySelector('.sidemenu');
                console.log("CLick", {sideMenu})
                if (sideMenu) {
                    sideMenu.classList.toggle('open');
                }
            });
        }

        // Listener on priority select element
        const prioritySelect = this.htmlNode.querySelector('select.priority');
        if (prioritySelect) {
            prioritySelect.addEventListener('change', (event) => {
                const target = event.target as HTMLSelectElement;
                this.priority = target.value;
                this.updateTodo()
                this.scrollToView()
            });
        }
    }

    public setHtmlNode(htmlNode: HTMLElement): void {
        // create htmlNode from template string
        const template = `${htmlNode.outerHTML}`;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = template;
        this.htmlNode = tempDiv.firstElementChild as HTMLElement;

    }

    // Add a method to update the priority display
    updatePriorityDisplay(): void {
        const priorityElement = this.htmlNode.querySelector('select.priority') as HTMLSelectElement;
        if (priorityElement) {
            priorityElement.querySelector(`option[value="${this.priority}"]`).setAttribute('selected', 'true');
        }
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
    static processDescription(description: string): string {
        return description.trim();
    }

    static processComplete(complete: string): boolean {
        return complete === "complete";
    }

    public toggleItem(): void {
        const textarea = this.htmlNode.querySelector('textarea')
        const expandToggle = this.htmlNode.querySelector('.expandBtn');

        if (textarea) {
            if (textarea.hasAttribute('expanded')) {
                textarea.removeAttribute('style');
                textarea.removeAttribute('expanded');
                expandToggle.textContent = "Expand Item";
                this.animateExpandCollapse(false)
            } else {
                this.scrollToView();
                setTimeout(() => {
                    textarea.setAttribute('style', "height: 400px");
                    textarea.setAttribute("expanded", "true");
                    expandToggle.textContent = "Collapse Item";
                    this.animateExpandCollapse(true)
                }, 20)
            }
        }
    }

    public animateExpandCollapse(expand: boolean): void {
        const textarea = this.htmlNode.querySelector('textarea');
        if (textarea) {
            const startHeight = expand ? 40 : 400;
            const endHeight = expand ? 400 : 40;
            const duration = 1000;
            const startTime = performance.now();

            const animate = (currentTime: number) => {
                const elapsedTime = currentTime - startTime;
                const progress = Math.min(elapsedTime / duration, 1);
                const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
                const easedProgress = easeInOutQuad(progress);
                const height = startHeight + (endHeight - startHeight) * easedProgress;
                textarea.style.height = `${height}px`;

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    if (!expand) {
                        textarea.removeAttribute('style');
                    }
                }
            };

            requestAnimationFrame(animate);
        }
    }

    public scrollToView(): void {
        const topOffset = 60;
        const elementPosition = this.htmlNode.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - topOffset;

        console.log("scrolling to", { node: this.htmlNode, elementPosition, offsetPosition, rect: this.htmlNode.getBoundingClientRect() });

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    public updateTodo(): void {

        // The data has already been set, we just need to rerender this item in the correct spot
        this.htmlNode.remove();
        this.addToDom();
        this.updatePriorityDisplay();
    }


    

    // When a TodoItem is creates, it should place itself in the correct spot with rending only its content.
    // No rerendering of any other content.
    // Uses an index property to determine where it should be placed in the list.
    public addToDom(): void {

        const notCompletedList = document.querySelector('#not-completed .list-container') as HTMLElement;
        const completedList = document.querySelector('#completed .list-container') as HTMLElement;

        const appendToList = (list: HTMLElement) => {
            const children = Array.from(list.children);
            let inserted = false;

            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                //@ts-ignore
                const childPriority = child.querySelector('select.priority')?.value;
                const childIndex = parseInt(child.getAttribute('data-index') || '0');

                if (this.priority === childPriority && this.index < childIndex) {
                    list.insertBefore(this.htmlNode, child);
                    inserted = true;
                    break;
                } else if (this.priority === 'high' && childPriority !== 'high') {
                    list.insertBefore(this.htmlNode, child);
                    inserted = true;
                    break;
                } else if (this.priority === 'medium' && childPriority === 'low') {
                    list.insertBefore(this.htmlNode, child);
                    inserted = true;
                    break;
                }
            }

            if (!inserted) {
                list.appendChild(this.htmlNode);
            }
        };

        if (this.complete) {
            if (completedList) {
                appendToList(completedList);
            }
        } else {
            if (notCompletedList) {
                appendToList(notCompletedList);
            }
        }

        this.setSelect2Nodes();
    }

    public setSelect2Nodes(): void {
        const selectElements = this.htmlNode.querySelectorAll('#details select');
        selectElements.forEach(select => {
            //@ts-ignore
            $(select).select2({
                width: '100%',
                theme: 'classic'
            })
        });
    }

    static createTodoItem(data: TodoItemData): ToDoItem {

        //@ts-ignore
        data.markCompleteText = data.complete === "complete" ? "Mark Incomplete" : "Mark Complete";
        
        const template = TemplateEngine.createTemplate(toDo_html, data);

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = template.trim();
        const htmlNode = tempDiv.firstElementChild as HTMLElement;

        return new ToDoItem(data, htmlNode);
    }

}