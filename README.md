<<<<<<< HEAD
React Authentication & Dashboard Implementation

1. Overview

This React application provides a role-based authentication system using localStorage for user management. It includes login, registration, and a dashboard with user role-based access.

2. Components

a. Login Component

Purpose:

The Login component handles user authentication by verifying credentials from localStorage and dispatching login actions to Redux.

State Management:

email, password, role – Stores user input.

errors – Stores validation errors.

Validation:

Ensures required fields are filled.

Validates email format.

Checks if role is selected.

Authentication Process:

Retrieves stored users from localStorage.

Checks if credentials match an existing user.

If successful, stores user data in Redux and localStorage.

Redirects to the dashboard.

Displays error messages for invalid credentials.

Redux Integration:

Dispatches login({ email, role }) action to Redux store.

b. Register Component

Purpose:

The Register component allows new users to create an account with a specified role.

State Management:

username, email, password, role – Stores input values.

errors – Stores validation errors.

Validation:

Ensures fields are filled correctly.

Username must be at least 3 characters.

Password must be at least 6 characters.

Email must match a standard format.

Registration Process:

Validates input fields.

Retrieves existing users from localStorage.

Stores the new user in localStorage.

Redirects to the login page.

c. Dashboard Component

Purpose:

Displays user details, manages student records, and enforces role-based access control.

State Management:

students – Stores student list.

formData – Manages student input data.

errors – Stores form validation messages.

currentPage – Handles pagination.

view – Toggles between form and list views.

Functionalities:

Displays logged-in user details.

Allows Admin & Editor roles to manage student records.

Implements pagination.

Provides CRUD operations for students.

Confirms deletion with a modal popup.

Logout Process:

Dispatches logout() action.

Redirects to login page.

3. Role-Based Access Control (RBAC)

Admin: Full access (add, edit, delete students).

Editor: Add & edit students.

Viewer: Read-only access.

4. LocalStorage Usage

registeredUsers: Stores user credentials.

loggedInUser: Stores current session.

students: Stores student records.

5. Navigation

React Router handles routing (/login, /register, /dashboard).

Uses useNavigate for redirection after login/logout.

6. Form Validation

Ensures required fields are filled.

Email validation with regex.

Enforces constraints on username, password, and role selection.

7. Conclusion

This application provides a basic role-based authentication system with form validation, localStorage-based user management, and student record CRUD operations.

=======
# React-Authentication-
>>>>>>> 7a0ca74b478e555de5fa6dae903056ad8b9925ca
