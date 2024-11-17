# TODO LIST

> Live deployment: https://williamowen65.github.io/ToDoList/

[Watch Video Demo of the app](https://www.youtube.com/watch?v=g47_egZwIj8)

<iframe width="420" height="345" src="https://www.youtube.com/watch?v=g47_egZwIj8">
</iframe>

What I would like to do is make a "todo list" that combines things from two great todo list.  

I want the ability to dispatch work efficiently. I want to be able to see an overview, turn on and off collections of todos and for them to have priority.  
The two inspirational sites for this are Google Calendar and Jira. 

## The plan


### 1. Complete the assignment

Create the basic todo list with the requirements
Add the local storage..   

### 2. Create the TodoItem class

> This would be stored in the the local storage  

The Todo Items need to be a class because they are going to have many properties.   
These properties may be: 

- priority
- createdAt
- completed
- groupId
- id


Actions:

- [Stretch goal] notify -- This can send push notifications via the browser? Emails? Text? Reminders?

### 3. Create the ToDoListSettings class

> This would be stored in the the local storage  

Maybe this class helps global controls for how the todo list works.

```json
collections = {
   [id]: { 
      name,
      id
   },
   ...
} 
```

---

# Sidenotes

I used a new CSS feature called @container. This is one of the latest additions to tools for media queries. but these media queries don't depend on screen side, but container size of elements instead. This is why the "mark completed logo" is rendered

## notes

The flash when saving the vote is new.. because of a class in the styles. It needs to be updated to not do that.
  








