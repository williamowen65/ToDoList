import {ToDoItem, TodoItemData} from "./class/ToDoItem";

export const todoItems: TodoItemData[] = [
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


export const quotes = {
    "not-completed":  [
        {
          "text": "A year from now you may wish you had started today.",
          "author": "Karen Lamb"
        },
        {
          "text": "Well done is better than well said.",
          "author": "Benjamin Franklin"
        },
        {
          "text": "Your mind is for having ideas, not holding them.",
          "author": "David Allen",
          "note": "creator of GTD, Getting Things Done"
        },
        {
          "text": "There is nothing so useless as doing efficiently that which should not be done at all.",
          "author": "Peter Drucker"
        },
        {
          "text": "Focus on being productive instead of busy.",
          "author": "Tim Ferriss"
        },
        {
          "text": "Nothing is particularly hard if you divide it into small jobs.",
          "author": "Henry Ford"
        },
        {
          "text": "The way to get started is to quit talking and begin doing.",
          "author": "Walt Disney"
        },
        {
          "text": "Amateurs sit and wait for inspiration. The rest of us just get up and go to work.",
          "author": "Stephen King"
        },
        {
          "text": "A goal without a plan is just a wish.",
          "author": "Antoine de Saint-Exupéry"
        },
        {
          "text": "You don’t need more time, you just need to decide.",
          "author": "Seth Godin"
        },
        {
          "text": "I love deadlines. I love the whooshing noise they make as they go by.",
          "author": "Douglas Adams"
        },
        {
          "text": "Why procrastinate now when you can put it off until later?",
          "author": "Unknown"
        },
        {
          "text": "My to-do list is like a never-ending story... of unfinished tasks.",
          "author": "Unknown"
        },
        {
          "text": "I always give 100% at work: 13% Monday, 22% Tuesday, 26% Wednesday, 35% Thursday, and 4% Friday.",
          "author": "Unknown"
        }
      ],
      "completed": [
        {
            "text": "I always give 100% at work: 13% Monday, 22% Tuesday, 26% Wednesday, 35% Thursday, and 4% Friday.",
            "author": "Unknown"
          }
      ]
}