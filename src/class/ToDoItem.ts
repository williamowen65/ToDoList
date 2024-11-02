export type TodoItemData = {
    id: string;
    task: string;
    complete: string;
}

export class ToDoItem {
    id: number;
    task: string;
    complete: boolean;
    htmlNode: HTMLElement;

    constructor(data: TodoItemData, htmlNode: HTMLElement) {

        this.id = ToDoItem.processId(data.id);
        this.task = ToDoItem.processTask(data.task);
        this.complete = ToDoItem.processComplete(data.complete);
        this.htmlNode = htmlNode;

        const expandBtn = this.htmlNode.querySelector('.expandBtn');
        if (expandBtn) {
            expandBtn.addEventListener('click', () => this.toggleItem());
        }

        this.addToDom()
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
            }

            setTimeout(() => {
                this.scrollToView();
            }, 200)
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
   
}