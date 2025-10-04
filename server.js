const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

let users = [];
let courses = [
    {
        id: '1',
        title: 'Introduction to Web Development',
        description: 'Learn the basics of HTML, CSS, and JavaScript.',
        lessons: [
            { id: '1.1', title: 'HTML Fundamentals' },
            { id: '1.2', title: 'CSS Styling' },
            { id: '1.3', title: 'JavaScript Basics' }
        ],
        completed: false
    },
    {
        id: '2',
        title: 'Advanced JavaScript Concepts',
        description: 'Dive deeper into JavaScript with advanced topics like closures, promises, and async/await.',
        lessons: [
            { id: '2.1', title: 'Closures and Scope' },
            { id: '2.2', title: 'Promises' },
            { id: '2.3', title: 'Async/Await' }
        ],
        completed: false
    },
    {
        id: '3',
        title: 'Building RESTful APIs with Node.js and Express',
        description: 'Learn to build robust RESTful APIs using Node.js and the Express framework.',
        lessons: [
            { id: '3.1', title: 'Introduction to Express' },
            { id: '3.2', title: 'Routing and Middleware' },
            { id: '3.3', title: 'Database Integration' }
        ],
        completed: false
    }
];

// Middleware for authentication
const authenticateUser = (req, res, next) => {
    const { username, password } = req.headers;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        req.user = user;
        next();
    } else {
        res.status(401).send('Unauthorized');
    }
};

// User signup
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    if (users.find(u => u.username === username)) {
        return res.status(400).send('User already exists');
    }
    const newUser = { username, password, completedCourses: [], resetToken: null, resetTokenExpiry: null };
    users.push(newUser);
    res.status(201).send('User registered successfully');
});

// User login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.status(200).json({ message: 'Login successful', username: user.username });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Get all courses
app.get('/courses', (req, res) => {
    res.status(200).json(courses);
});

// Get course details
app.get('/courses/:id', (req, res) => {
    const { id } = req.params;
    const course = courses.find(c => c.id === id);
    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404).send('Course not found');
    }
});

// Mark course as completed
app.post('/courses/:id/complete', authenticateUser, (req, res) => {
    const { id } = req.params;
    const course = courses.find(c => c.id === id);
    if (!course) {
        return res.status(404).send('Course not found');
    }

    const user = req.user;
    if (!user.completedCourses.includes(id)) {
        user.completedCourses.push(id);
        course.completed = true;
        res.status(200).send('Course marked as completed');
    } else {
        res.status(200).send('Course already completed');
    }
});

// Request password reset
app.post('/forgot-password', (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).send('User not found');
    }

    // Generate a reset token (in a real app, use a more robust token generation)
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const resetTokenExpiry = Date.now() + 3600000; // 1 hour

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;

    // In a real application, you would send an email with this link
    console.log(`Password reset link for ${user.username}: http://localhost:3000/reset-password.html?token=${resetToken}`);

    res.status(200).send('Password reset link sent to your email (check console).');
});

// Reset password
app.post('/reset-password', (req, res) => {
    const { token, newPassword } = req.body;
    const user = users.find(u => u.resetToken === token && u.resetTokenExpiry > Date.now());

    if (!user) {
        return res.status(400).send('Invalid or expired password reset token.');
    }

    user.password = newPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    res.status(200).send('Your password has been reset successfully.');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
