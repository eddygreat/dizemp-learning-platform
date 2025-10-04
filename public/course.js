document.addEventListener('DOMContentLoaded', () => {
    const courseTitle = document.querySelector('#course-detail h2');
    const courseDescription = document.getElementById('course-description');
    const lessonsList = document.getElementById('lessons-list');
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    const completionMessage = document.getElementById('completion-message');
    const logoutBtn = document.getElementById('logout-btn');

    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('id');
    const username = localStorage.getItem('username');

    if (username) {
        logoutBtn.style.display = 'inline-block';
    } else {
        logoutBtn.style.display = 'none';
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('username');
        window.location.href = 'index.html';
    });

    async function fetchCourseDetails() {
        try {
            const response = await fetch(`/courses/${courseId}`);
            const course = await response.json();
            displayCourseDetails(course);
        } catch (error) {
            console.error('Error fetching course details:', error);
        }
    }

    function displayCourseDetails(course) {
        courseTitle.textContent = course.title;
        courseDescription.textContent = course.description;
        lessonsList.innerHTML = '';
        course.lessons.forEach(lesson => {
            const listItem = document.createElement('li');
            listItem.textContent = lesson.title;
            lessonsList.appendChild(listItem);
        });

        if (username) {
            markCompleteBtn.style.display = 'block';
            if (course.completed) {
                markCompleteBtn.textContent = 'Course Completed';
                markCompleteBtn.classList.add('completed');
                markCompleteBtn.disabled = true;
                completionMessage.className = 'message success';
                completionMessage.textContent = 'You have completed this course!';
            } else {
                markCompleteBtn.textContent = 'Mark as Completed';
                markCompleteBtn.classList.remove('completed');
                markCompleteBtn.disabled = false;
                completionMessage.textContent = '';
            }
        } else {
            markCompleteBtn.style.display = 'none';
        }
    }

    markCompleteBtn.addEventListener('click', async () => {
        if (!username) {
            alert('Please login to mark courses as completed.');
            window.location.href = 'login.html';
            return;
        }
        try {
            const response = await fetch(`/courses/${courseId}/complete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': username, // Assuming username for authentication
                    'password': localStorage.getItem('password') || '' // You might want a more secure way to handle passwords
                }
            });

            const message = await response.text();

            if (response.ok) {
                completionMessage.className = 'message success';
                completionMessage.textContent = message;
                markCompleteBtn.textContent = 'Course Completed';
                markCompleteBtn.classList.add('completed');
                markCompleteBtn.disabled = true;
                fetchCourseDetails(); // Re-fetch to update course status
            } else {
                completionMessage.className = 'message error';
                completionMessage.textContent = message;
            }
        } catch (error) {
            console.error('Error marking course as completed:', error);
            completionMessage.className = 'message error';
            completionMessage.textContent = 'An error occurred.';
        }
    });

    if (courseId) {
        fetchCourseDetails();
    } else {
        courseTitle.textContent = 'Course Not Found';
        courseDescription.textContent = 'Please navigate from the home page.';
    }
});
