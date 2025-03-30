# ToDo List

## Live Deployment
[Click here to view the app](https://williamowen65.github.io/ToDoList/)

## Video Demo
Watch a video demo of the app (link coming soon).

## Project Overview
This ToDo List application is inspired by the best features of **Google Calendar** and **Jira**. The goal is to create an efficient task management system that allows users to:
- **Dispatch work efficiently**
- **Get an overview of tasks**
- **Toggle collections of tasks on and off**
- **Set priorities for tasks**

## Development Plan
### 1. Complete the Assignment
- Implement the basic ToDo List with the required functionality.
- Add **local storage** support to persist tasks.

### 2. Create the `TodoItem` Class
- Store `TodoItem` objects in **local storage**.
- Each `TodoItem` will have multiple properties:
  - `priority`
  - `createdAt`
  - `completed`
  - `groupId`
  - `id`
- Actions:
  - **[Stretch Goal] Notify Users** – Implement push notifications, emails, or text reminders.

### 3. Create the `ToDoListSettings` Class
- Store settings in **local storage**.
- Manage global controls for how the ToDo List behaves.
- Define collections:
  ```json
  collections = {
    "id1": { "name": "Work Tasks", "id": "id1" },
    "id2": { "name": "Personal Goals", "id": "id2" }
  }
  ```

## Technical Notes
- **CSS Container Queries:**
  - Used the new `@container` feature, allowing media queries to depend on an element’s container size rather than the screen size.
  - This ensures responsive UI behavior, such as rendering the "mark completed" logo dynamically.

- **Bug: Flashing Issue on Save**
  - When saving a task, there's an unintended flash due to a CSS class.
  - Needs to be updated to prevent the flickering effect.

## Future Enhancements
- Improve UI/UX for better task visualization.
- Add filtering and sorting options.
- Expand notification capabilities.
- Implement user authentication for multi-device sync.

---
This project is a work in progress. Contributions and feedback are welcome!

