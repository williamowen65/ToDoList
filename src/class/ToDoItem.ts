export type TodoItemData = {
    id: string;
    task: string;
    complete: string;
    priority: string;
    description: string;
}

export class ToDoItem {
    id: number;
    task: string;
    complete: boolean;
    priority: string; // Add priority property
    htmlNode: HTMLElement;
    description: string;

    constructor(data: TodoItemData, htmlNode: HTMLElement) {
        this.id = ToDoItem.processId(data.id);
        this.task = ToDoItem.processTask(data.task);
        this.complete = ToDoItem.processComplete(data.complete);
        this.priority = data.priority; // Set priority
        this.htmlNode = htmlNode;
        this.description = ToDoItem.processDescription(data.description);
        

        const expandBtn = this.htmlNode.querySelector('.expandBtn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => this.toggleItem());
        }

        this.addToDom();
        this.updatePriorityDisplay(); // Update priority display

        // this.setListeners(); // userSetPriority
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
                textarea.setAttribute('style', "height: 400px");
                textarea.setAttribute("expanded", "true");
                expandToggle.textContent = "Collapse Item";
                this.animateExpandCollapse(true)
                setTimeout(() => {
                    this.scrollToView();
                }, 200)
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
        const topOffset = 0
        const elementPosition = this.htmlNode.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - topOffset;

        console.log("scrolling to", {node: this.htmlNode, elementPosition, offsetPosition, rect: this.htmlNode.getBoundingClientRect()});

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    public addToDom(): void {
        const notCompletedList = document.querySelector('#not-completed');
        const completedList = document.querySelector('#completed');

        if (this.complete) {
            if (completedList) {
                completedList.appendChild(this.htmlNode);
            }
        } else {
            if (notCompletedList) {
                notCompletedList.appendChild(this.htmlNode);
            }
        }
    }

    
    static createTodoItem(data: TodoItemData, htmlNode: HTMLElement): ToDoItem {

        const template = `
        <div class="todo">
            <div class="left-sidebar">
              <div class="mark-completed">
                <b><small><label class="d-none" for="completed-task-${data.id}">Mark completed</label></small></b>
                  <input type="checkbox" class="completed" id="completed-task-${data.id}" name="completed-task-${data.id}" />
              </div>
              <button class="grid-placement expandBtn">Expand Item</button>
            </div>
  
            <div class="text-inputs">
              <input type="text" class="title" placeholder="Title" value="${data.task}"/>
              <textarea name="description" placeholder="Description" >${data.description}</textarea>
            </div>
            <div class="right-sidebar">
              <select class="priority">
                <!-- selected assigned by js -->
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button class="deleteBtn">Delete</button>
              <div class="todo-details">Todo details</div>
            </div>
          </div>
        `
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = template.trim();
        htmlNode = tempDiv.firstElementChild as HTMLElement;

        return new ToDoItem(data, htmlNode);
    }
   
}