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
