// Floating Navbar Active State
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        document.querySelector(link.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Role-Based Login Handling
document.getElementById('loginForm')?.addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Example role-based login
    if (username === 'teacher' && password === '1234') {
        alert('Teacher logged in successfully!');
        window.location.href = 'dashboard.html';
    } else if (username === 'student' && password === '1234') {
        alert('Student logged in successfully!');
        window.location.href = 'view-attendance.html';
    } else {
        alert('Invalid login!');
    }
});

// Attendance Tracking with Local Storage
function saveAttendance(date, periodsAttended) {
    let attendance = JSON.parse(localStorage.getItem('attendance')) || [];

    // Prevent Duplicate Attendance
    const existingRecord = attendance.find(record => record.date === date);
    if (existingRecord) {
        alert('Attendance already marked for this date!');
        return;
    }

    attendance.push({ date, periodsAttended });
    localStorage.setItem('attendance', JSON.stringify(attendance));
    alert('Attendance marked successfully!');
}

// Load Attendance Data
function loadAttendance() {
    const table = document.getElementById('attendanceTable');
    let attendance = JSON.parse(localStorage.getItem('attendance')) || [];

    attendance.forEach(record => {
        const row = table.insertRow();
        row.insertCell(0).innerText = record.date;
        row.insertCell(1).innerText = record.periodsAttended;
        row.insertCell(2).innerText = '8';
    });
}

// Percentage Calculation
function calculatePercentage() {
    let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    let totalPeriods = attendance.length * 8;
    let periodsAttended = attendance.reduce((sum, record) => sum + parseInt(record.periodsAttended), 0);

    let percentage = totalPeriods ? (periodsAttended / totalPeriods) * 100 : 0;
    document.getElementById('attendancePercentage').innerText = percentage.toFixed(2) + '%';
}

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadAttendance();
    calculatePercentage();
});
