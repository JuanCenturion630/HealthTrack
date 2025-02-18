// Toggle views
function showCalendar(serviceName) {
    document.getElementById('servicesView').classList.add('hidden');
    document.getElementById('calendarView').classList.remove('hidden');
    document.getElementById('calendarTitle').textContent = `Turnos - ${serviceName}`;
    renderCalendar();
}

function showServices() {
    document.getElementById('calendarView').classList.add('hidden');
    document.getElementById('servicesView').classList.remove('hidden');
}

// Calendar functionality
let currentDate = new Date();

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    document.getElementById('currentMonth').textContent = new Date(year, month).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const calendarGrid = document.querySelector('.calendar-grid');
    const daysHTML = Array(7).fill('').map((_, i) => `
                <div class="text-center fw-bold">${['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][i]}</div>
            `).join('');

    const days = Array(startingDay).fill('').map(() => `
                <div class="calendar-day"></div>
            `);

    for (let i = 1; i <= totalDays; i++) {
        const hasAppointment = Math.random() < 0.3; // Simulate appointments
        days.push(`
                    <div class="calendar-day ${hasAppointment ? 'has-appointment' : ''}">
                        ${i}
                        ${hasAppointment ? `
                            <div class="appointment-dot"></div>
                            <div class="appointment-time">09:00</div>
                        ` : ''}
                    </div>
                `);
    }

    calendarGrid.innerHTML = daysHTML + days.join('');
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle')?.addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});