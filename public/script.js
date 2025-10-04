document.addEventListener('DOMContentLoaded', () => {
    const coursesList = document.getElementById('courses-list');
    const logoutBtn = document.getElementById('logout-btn');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');
    const username = localStorage.getItem('username');

    if (username) {
        loginBtn.style.display = 'none';
        signupBtn.style.display = 'none';
        logoutBtn.style.display = 'inline-block';
    } else {
        loginBtn.style.display = 'inline-block';
        signupBtn.style.display = 'inline-block';
        logoutBtn.style.display = 'none';
    }

    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('username');
        window.location.reload();
    });

    async function fetchCourses() {
        try {
            const response = await fetch('/courses');
            const courses = await response.json();
            displayCourses(courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    function displayCourses(courses) {
        coursesList.innerHTML = '';
        courses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.className = 'course-card';
            courseCard.innerHTML = `
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <a href="course.html?id=${course.id}" class="button">View Details</a>
            `;
            coursesList.appendChild(courseCard);
        });
    }

    fetchCourses();
});
