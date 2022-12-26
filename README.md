# Prompt:

Please share samples of code you've personally written for one or two completed Backend projects. The samples can be from personal, academic, or professional projects. Here are some guidelines to help provide more context on what we're looking for:

- Code that is clean and maintainable

- There is some type of design pattern followed (MVVM, etc)

- Solid understanding of Backend domain knowledge (navigation, state management, etc).

- Code that you wrote. If it is a team project, please include the git history with the repo so we can clearly know what you worked on vs the rest of the team.

You can either reply to this email with zip file(s) attached or send us GitHub link(s). If you do not have any up to date work, we encourage you to take our coding challenge which can be found attached to this email.

# Challenge:

[ API Hosted on Cyclic](https://backend-for-rl.cyclic.app/)

### All Routes:

`/`
-POST `/signup`
-POST `/login`
-GET `/dashboard`
`/todo` - GET `/getAllTodos/` - GET `/:_id` - GET `/getTodo/:user` - POST `/postTodo/` - DELETE `/deleteTodo/:_id` - PUT `/editTodo/:_id`
`/user/` - GET `/:email`

### Requirements

#### 1. Add a to-do

After logging in, users can submit a form to make a POST request to `/todo/postTodo`.
Todo = {
user: ObjectID;
todo: String;
date: Date.now();
finished: Boolean
}

#### 2. & 3. Change a to-do & Delete a to-do (do a soft delete)

If the current logged-in user's \_id (from localStorage) matches the \_id of the todo's `user` property, three buttons will be displayed: edit, snooze, and delete. Edit will update the db via PUT request to `/todo/editTodo/:_id`, snooze will remove the todo from the UI until next page refresh, and delete todo from the db via DELETE request to `/todo/deleteTodo/:_id`

#### 4. List all todos

- `todo/getAllTodos/` Fetches all todos from the database, todos owned by the user will show the edit, snooze, and delete buttons.

#### 5. Return a todo

- Each todo card has a permalink to `/todo/${todoObject._id}`, this shows a page to view a single todo. A user does not need to own the todo to visit the permalink.

#### 6. login

- Auth is handled by MongoStore, passport, and bcrypt. On signup, a user document is created:
- User = {
  email: String ,
  password: String, <- bcrypt
  todos: todo[],
  }
- Passport uses local strategy on login, the user's email and \_id are set in localStorage and used client side.

#### 7. return a user

- On the dashboard page, a form accepts an email and returns that user's todos. GET request to `user/:email`.
