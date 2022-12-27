# Code - Challenge: To Do API

## All Routes:

/ Index page GET

/api

- /auth

  - /signup - POST

  - /login - POST

- /todo

  - /getAllTodos - GET

  - /:\_id - GET

  - /getTodo/:user - GET

  - /postTodo - POST

  - /deleteTodo/:\_id - DELETE

  - /editTodo/:\_id - PUT

- /user

  - /:email - GET

## Requirements

### 1. Add a to-do

After logging in, users can submit a form to make a POST request to `/api/todo/postTodo`.

```JS
Todo = {

user: ObjectID;

todo: String;

date: Date.now();

finished: Boolean

}
```

### 2. & 3. Change a to-do & Delete a to-do (do a soft delete)

If the current logged-in user's \_id (from localStorage) matches the \_id of the to-do's user property, three buttons will be displayed: edit, snooze, and delete. 'Edit' will update the db via PUT request to `/api/todo/editTodo/:_id`, 'snooze' will remove the to-do from the UI until next page refresh (soft delete), and 'delete' will remove a to-do from the db via DELETE request to `/api/todo/deleteTodo/:_id`

### 4. List all to-dos

- `/api/todo/getAllTodos/` Fetches all todos from the database, to-dos owned by the user will show the edit, snooze, and delete buttons.

### 5. Return a to-do

- Each to-do card has a permalink to `/api/todo/:_id`, this shows a page to view a single to-do. A user does not need to own the to-do to visit the permalink (e.g. if they click the link from the page showing all to-dos).

### 6. login

- Auth is handled by MongoStore, passport, and bcrypt. On signup, a user document is created:

```
User = {

email: String ,

password: String, <- bcrypt

todos: todo[],

}
```

- Passport uses local strategy on login, the user's email and \_id are set in localStorage and used client side.

### 7. return a user

- On the dashboard page, a form accepts an email and returns that user's to-dos. GET request to `user/:email`.
