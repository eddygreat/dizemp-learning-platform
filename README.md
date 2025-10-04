# Mini E-Learning Platform

Welcome to the Mini E-Learning Platform! This project demonstrates a basic web application where users can view a list of courses, see course details, mark courses as completed, and manage their accounts with login/signup and password recovery functionality.

## ✨ Features

-   **User Authentication**: Secure user login and signup to personalize the learning experience.
-   **Password Recovery**: A mechanism to reset forgotten passwords, ensuring users can always access their accounts.
-   **Course Listing**: Browse a list of available courses on the home page.
-   **Course Details**: View detailed information for each course, including a description and a list of lessons.
-   **Course Completion**: Mark courses as "completed" to track your progress.
-   **Responsive Design**: A clean and visually appealing interface, suitable for various screen sizes.
-   **Interactive Elements**: Hover effects for buttons and links to enhance user experience.

## 🚀 Technologies Used

This project is built using a combination of frontend and backend technologies:

### Frontend
-   **HTML5**: For structuring the web content.
-   **CSS3**: For styling the application and creating a visually appealing design.
-   **JavaScript (Vanilla JS)**: For interactive elements, fetching data from the backend, and managing user sessions.

### Backend
-   **Node.js**: A JavaScript runtime environment that allows building server-side applications.
-   **Express.js**: A fast, unopinionated, minimalist web framework for Node.js, used to build the RESTful API.

### Data Storage
-   **In-memory Arrays/JSON**: User and course data are stored in JavaScript arrays on the server-side, meaning data will reset each time the server is restarted. For a production application, a database would be used.

## 🛠️ Setup Instructions

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Before you begin, ensure you have the following installed:

-   **Node.js**: Includes npm (Node Package Manager). Download it from [nodejs.org](https://nodejs.org/).

### Installation Steps

1.  **Clone the Repository (or download the project files)**:

    If you're using Git, you would typically clone the repository. If you've received the project files directly, skip this step.
    ```bash
    git clone https://github.com/eddygreat/dizemp-learning-platform
    cd E_Learning_Platform # Navigate into your project folder
    ```

2.  **Install Backend Dependencies**:

    Open your terminal or command prompt, navigate to the project's root directory (`E_Learning_Platform`), and run the following command to install the necessary Node.js packages (specifically Express.js):
    ```bash
    npm install
    ```

3.  **Enable PowerShell Script Execution (Windows Only - if you encounter issues)**:

    If you are on Windows and encounter an error related to `npm` not being recognized or scripts being disabled, you might need to adjust your PowerShell execution policy. **Run PowerShell as an Administrator** and execute:
    ```powershell
    Set-ExecutionPolicy RemoteSigned
    ```
    Type `Y` and press Enter when prompted. Restart your terminal/IDE after this change.

## 🏃 How to Run the Application

1.  **Start the Backend Server**:

    From the project's root directory in your terminal, run:
    ```bash
    node server.js
    ```
    You should see a message like `Server running on port 3000`.

2.  **Access the Frontend**:

    Open your web browser and go to:
    ```
    http://localhost:3000
    ```

## 📝 How to Use the App

### 1. Signing Up
-   Click on "Sign Up" in the navigation bar.
-   Enter a unique username and a password.
-   Click "Sign Up". You will be redirected to the login page upon successful registration.

### 2. Logging In
-   Click on "Login" in the navigation bar or navigate to `http://localhost:3000/login.html`.
-   Enter your registered username and password.
-   Click "Login". You will be redirected to the home page.

### 3. Viewing Courses
-   On the home page (`index.html`), you will see a list of available courses.
-   Click on "View Details" for any course to see its description and lessons.

### 4. Marking a Course as Completed
-   While viewing course details (and *after* logging in), you will see a "Mark as Completed" button.
-   Click this button to mark the course as completed. A success message will appear, and the button will become disabled.

### 5. Password Recovery
-   If you forget your password, go to the login page and click on "Forgot Password?".
-   Enter your username and click "Send Reset Link."
-   **Check your terminal where `node server.js` is running.** A password reset link will be printed there. Copy this link.
-   Paste the copied link into your browser. This will take you to the "Reset Password" page.
-   Enter and confirm your new password.
-   After a successful reset, you will be redirected to the login page to log in with your new password.

### 6. Logging Out
-   Click on "Logout" in the navigation bar (visible when logged in).
-   This will clear your session and refresh the page.

## 📂 Project Structure

```
E_Learning_Platform/
├── node_modules/        # Directory for Node.js dependencies
├── public/              # Contains all frontend static files
│   ├── auth.js          # JavaScript for login and signup logic
│   ├── course.html      # HTML for displaying individual course details
│   ├── course.js        # JavaScript for course detail page logic
│   ├── forgot-password.html # HTML for requesting password reset
│   ├── index.html       # HTML for the home page (course listing)
│   ├── login.html       # HTML for the user login page
│   ├── password-recovery.js # JavaScript for forgot/reset password logic
│   ├── script.js        # JavaScript for home page logic
│   └── signup.html      # HTML for the user signup page
│   └── style.css        # Global CSS styles for the application
├── server.js            # Backend server (Node.js with Express.js) and API endpoints
└── package.json         # Project metadata and dependencies
└── package-lock.json    # Records the exact dependency tree
└── README.md            # This file
```

Enjoy learning! If you have any questions or feedback, feel free to reach out.
