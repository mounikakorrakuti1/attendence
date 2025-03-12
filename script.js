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
        row.insertCell(2).innerText = '8'; // Fixed periods per day
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

// QR Code Scanner Placeholder
function scanQRCode() {
    alert('QR Code Scanning feature coming soon!');
}

// Report Download
function downloadReport() {
    let attendance = JSON.parse(localStorage.getItem('attendance')) || [];
    let csvContent = 'Date,Periods Attended,Total Periods\n';

    attendance.forEach(record => {
        csvContent += `${record.date},${record.periodsAttended},8\n`;
    });

    let blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'attendance_report.csv';
    link.click();
}

// On Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadAttendance();
    calculatePercentage();
});
