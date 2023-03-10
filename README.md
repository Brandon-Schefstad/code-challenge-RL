# Intro

Hello! Within this repo you will find both the completed coding challenge for a to-do api as well as sample code from a full stack application I created.

The To-do API is a full MERN stack application built using MVC design pattern. 

**_Please note that Cyclic's load times can take up to 20 seconds! I have found first login typically takes the longest, but once the app is up it is significantly more responsive._** 

- API endpoint available at [https://backend-for-rl.cyclic.app/](https://backend-for-rl.cyclic.app/).
  - Also GET route available at [https://backend-for-rl.cyclic.app/api/todo/getAllTodos](https://backend-for-rl.cyclic.app/api/todo/getAllTodos)
  - Also GET route available at [https://backend-for-rl.cyclic.app/api/user/bschefstad-admin@gmail.com](https://backend-for-rl.cyclic.app/api/user/bschefstad-admin@gmail.com)
- Frontend UI available at [https://frontend-for-rl.netlify.app/](https://frontend-for-rl.netlify.app/).
  - Use email `bschefstad-admin@gmail.com` and password `bschefstad-admin@gmail.com` for quick access.

My application's called 'ESE-At-A-Glance'. It is built in NodeJS using Express and MongoDB following MVC design pattern. 

- Application available at [https://ese-at-a-glance.cyclic.app/](https://ese-at-a-glance.cyclic.app/)
  - Use email `bschefstad-admin@gmail.com` and password `bschefstad-admin@gmail.com` for quick access.
- [Github Link](https://github.com/Brandon-Schefstad/ESEAtAGlance])

## Prompt:

Please share samples of code you've personally written for one or two completed Backend projects. The samples can be from personal, academic, or professional projects. Here are some guidelines to help provide more context on what we're looking for:

- Code that is clean and maintainable

- There is some type of design pattern followed (MVVM, etc)

- Solid understanding of Backend domain knowledge (navigation, state management, etc).

- Code that you wrote. If it is a team project, please include the git history with the repo so we can clearly know what you worked on vs the rest of the team.

You can either reply to this email with zip file(s) attached or send us GitHub link(s). If you do not have any up to date work, we encourage you to take our coding challenge which can be found attached to this email.

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
Each to-do has a stored 'user' property. If the current logged-in user's \_id (from localStorage) matches, three buttons will be displayed: edit, snooze, and delete. 'Edit' will update the db via PUT request to `/api/todo/editTodo/:_id`, 'snooze' will remove the to-do from the UI until next page refresh (soft delete), and 'delete' will remove a to-do from the db via DELETE request to `/api/todo/deleteTodo/:_id`

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

- Passport uses local strategy on login, upon validation with mongoDB, the user's email and \_id are set in localStorage and used client side.

### 7. return a user

- On the dashboard page, a form accepts an email and returns that user's to-dos. GET request to `user/:email`.

# Code Sample - ESE-At-A-Glance

### [Live Site](https://ese-at-a-glance.cyclic.app/) || [Github](https://github.com/Brandon-Schefstad/ESEAtAGlance)

### Summary

Students with disabilities (SWD) receive an Individualized Education Plan at least once a year. This plan is a lengthy legal document detailing important information about a student. When I was a middle school teacher of SWD, communicating this information to other teachers was incredibly time consuming. For each of my 9 students, I had to explain this 20 page document to their 7 teachers. Seeking a better way, I built ESE-at-a-Glance. ESE stands for 'Exceptional Student Education', the umbrella term for the education of SWD. This application is designed for teachers to store and display pertinent datapoints about our students. The database is searchable by student number and presents the results on a dashboard.

This code sample includes only the backend code (no views/public folder). The entire source code can be found at the GitHub link above.

## Backend Structure

The backend API utilizes MongoDB both for storing the student/user information as well as authentication/session data. It also runs on an express server in NodeJS. It is built following MVC architecture.

config/

- `.env` - contains environment variables such as MONGO_URI

- `database.js` - module export to connect to the database.

- `passport.js` - passport configuration specifying a LocalStrategy

controllers/

- utils/

  - `accommodations.js` - A list of all accommodations a school district provides, split into four domains (presentation, response, setting, and scheduling)

  - `populateStudentObject.js` - The search and edit features of the app require data to send with the API response. This function handles the construction of that data.

  - `separateAccommodationsIntoDomains.js` - By default student accommodations are stored as an array of strings, this function divides them into the four domains (presentation, response, setting, and scheduling)

- student/

  - `accommodations.js` - (1) renders a page displaying a student's list of accommodations or (2) accepts a POST request to update a student's accommodations.

  - `addGoals.js` - (1) renders a form to create a new goal for a student or (2) accepts a POST request to submit a new goal.

  - `addNewStudent.js` - (1) renders a form to create a new student or (2) accepts a POST request to submit a new student.

  - `deleteStudent.js` - deletes a student from the database.

  - `editStudent.js` - (1) renders a page to edit student information or (2) accepts a POST request to update a student's profile on the database.

  - `searchStudent.js` - (1) renders a form to retrieve student information or (2) accepts a GET request to display a specific student's information.

- `auth.js` - Handles authentication logic including validators

- `dashboard.js` - Renders a teacher's dashboard of students, if the teacher has no students, renders a default page explaining Individualized Education Plans.

- `home.js` - Displays the index page

middleware/

- `auth.js` - module export for ensureAuth, used on all routes besides `/`, `/login`, and `/signup`

- `cloudinary.js` - config information for cloudinary to store student images.

- `multer.js` - module export to only accept specific file formats for student images

models/

- `Goal.js`

- `Student.js`

- `Teacher.js`

routes/

- student/

  - `accommodations.js`

  - `addGoal.js`

  - `addNewStudent.js`

  - `deleteStudent.js`

  - `editStudent.js`

  - `searchStudent.js`

- dashboard.js

- index.js

- mainstudent.js - directs traffic to specific `student/` route

server.js - Starts an express server, connects to the database, establishes configs for passport and express sessions, and implements middleware such as methodOverride.
