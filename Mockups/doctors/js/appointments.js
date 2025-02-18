// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Mark appointment as completed
function markAsCompleted(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('td:nth-child(5)');
    const actionsCell = row.querySelector('td:nth-child(6)');

    statusCell.innerHTML = '<span class="badge badge-completed">Atendido</span>';
    actionsCell.innerHTML = '<button class="btn btn-sm btn-secondary" disabled>Completado</button>';
}

// Cancel appointment
function cancelAppointment(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('td:nth-child(5)');
    const actionsCell = row.querySelector('td:nth-child(6)');

    statusCell.innerHTML = '<span class="badge badge-cancelled">Cancelado</span>';
    actionsCell.innerHTML = '<button class="btn btn-sm btn-secondary" disabled>Cancelado</button>';
}

document.addEventListener('DOMContentLoaded', function () {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    document.getElementById('currentDate').textContent = today.toLocaleDateString('es-ES', options);
});