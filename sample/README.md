# Code Sample - ESE-At-A-Glance
## [Live Site](https://ese-at-a-glance.cyclic.app/)
## [Github](https://github.com/Brandon-Schefstad/ESEAtAGlance)

### Summary

Students with disabilities (SWD) receive an Individualized Education Plan at least once a year. This plan is a lengthy legal document indicating a student's present level, goals for this upcoming year, progress on previous goals, and a list of their accommodations for the classroom.

When I was a middle school teacher of SWD, communicating this information to other teachers was incredibly time consuming. For each of my 9 students, I had to explain this lengthy 20 page document to their 7 teachers. I initially started consolidating information and handing out cheat sheets to save on time, but found teachers lost them or would not read them. Seeking a better way, I built ESE-at-a-Glance. ESE stands for 'Exceptional Student Education', the umbrella term for the education of SWD. This application is designed for teachers to store and display pertinent information about our students. The database is searchable by student number and presents the results on a dashboard.

This code sample includes only the backend code (no views/public folder). The entire source code can be found at the GitHub link above. Since the code challenge requested backend code though I removed all frontend code for clarity. 

## Backend Structure

The backend API utilizes MongoDB both for storing the student/user information as well as authentication/session data. It also runs on an express server in NodeJS. It is built following MVC architecture.

- `config/`
  - `.env` - contains environment variables such as MONGO_URI
  - `database.js` - module export to connect to the database.
  - `passport.js` - passport configuration specifying a LocalStrategy
- `controllers/`
  - `student/` - contains the logic for the student route
    - `accommodations.js` - (1) renders a page displaying a student's list of accommodations or (2) accepts a POST request to update a student's accommodations.
    - `addGoals.js` - (1) renders a form to create a new goal for a student or (2) accepts a POST request to submit a new goal.
    - `addNewStudent.js` - (1) renders a form to create a new student or (2) accepts a POST request to submit a new student.
    - `deleteStudent.js` - deletes a student from the database.
    - `editStudent.js` - (1) renders a page to edit student information or (2) accepts a POST request to update a student's profile on the database.
    - `searchStudent.js` - (1) renders a form to retrieve student information or (2) accepts a GET request to display a specific student's information.
  - `utils/`
    - `accommodations.js` - A list of all accommodations a school district provides, split into four domains (presentation, response, setting, and scheduling)
    - `populateStudentObject.js` - The search and edit features of the app require data to be passed into the API response. This function handles the construction of that data.
    - `separateAccommodationsIntoDomains.js` - By default student accommodations are stored as an array of strings, this function divides them into the four domains (presentation, response, setting, and scheduling)
  - `auth.js` - Handles authentication logic including validators
  - `dashboard.js` - Renders a teacher's dashboard of students, has a default page explaining Individualized Education Plans.
  - `home.js` - Displays the index page
- `middleware/`
  - `auth.js` - module export for ensureAuth, used on all routes besides `/`, `/login`, and `/signup`
  - `cloudinary.js` - config information for cloudinary to store student images.
  - `multer.js` - module export to only accept specific file formats for student images
- `models/`
  - `Goal.js`
    - Student - ObjectId of the assigned student
    - Grade - Grade in school the goal was assigned (e.g. 5th Grade)
    - Domain - A broad term for what the goal addresses (e.g. 'curriculum')
    - Text - What the student must accomplish
    - Succeed - Did the student accomplish the goal?
    - Notes
  - `Student.js`
    - First Name
    - Last Name
    - ID
    - Grade
    - Primary Exceptionality - The student's disability (e.g. Deaf/Hard-of-Hearing)
    - Secondary Exceptionality - Any other disability a student may have.
    - Case Manager - ESE Teacher who ensures a student is being supported at school.
    - History - Past goals of the student
    - Accommodations - List of accommodations a student must be provided in class.
    - IEP Due Date
    - Cloudinary ID
    - Image - URL to cloudinary file.
  - `Teacher.js`
    - First Name
    - Last Name
    - Password - encrypted using bcrypt
    - Email
    - Student Array - List of students assigned to this teacher
- `routes/`
  - `student/` - handles routing for `/student`, separated into smaller files for maintainability.
    - `accommodations.js`
    - `addGoal.js`
    - `addNewStudent.js`
    - `deleteStudent.js`
    - `editStudent.js`
    - `searchStudent.js`
  - `dashboard.js`
  - `index.js` - route for index, login, logout, and signup
  - `mainstudent.js` - directs traffic to specific `student/` route
- `server.js` - Starts an express server, connects to the database, establishes configs for passport and express sessions, and implements middleware such as methodOverride.
