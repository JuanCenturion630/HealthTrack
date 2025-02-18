// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Initialize Flatpickr for date inputs
flatpickr("#dateFilter", {
    locale: "es",
    dateFormat: "d/m/Y",
    mode: "range"
});

flatpickr("#appointmentDate", {
    locale: "es",
    enableTime: true,
    dateFormat: "d/m/Y H:i",
    minDate: "today"
});

flatpickr("#editAppointmentDate", {
    locale: "es",
    enableTime: true,
    dateFormat: "d/m/Y H:i",
    minDate: "today"
});

// Simulated appointment data
let appointments = [
    { id: 1, date: '2023-08-10 09:00', patient: 'María González', doctor: 'Dr. Juan Pérez', service: 'Consulta General', status: 'Realizado' },
    { id: 2, date: '2023-08-10 10:30', patient: 'Carlos Rodríguez', doctor: 'Dra. María González', service: 'Cardiología', status: 'Pendiente' },
    { id: 3, date: '2023-08-11 11:00', patient: 'Ana Martínez', doctor: 'Dr. Carlos Rodríguez', service: 'Pediatría', status: 'Solicitado' },
    { id: 3, date: '2023-08-11 11:30', patient: 'Ana Martínez', doctor: 'Dr. Carlos Rodríguez', service: 'Pediatría', status: 'Cancelado' }
];

// Function to populate appointments table
function populateAppointmentsTable() {
    const tableBody = document.getElementById('appointmentsTableBody');
    tableBody.innerHTML = '';
    appointments.forEach(appointment => {
        const row = tableBody.insertRow();
        let buttons = "";

        switch (appointment.status) {
            case "Realizado":
                buttons = `
                    <td>
                        <div class="d-flex flex-wrap gap-1 justify-content-center">
                            <button class="btn btn-sm btn-info text-white flex-fill">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                        </div>
                    </td>
                    `
                break;

            case "Solicitado":
                buttons = `
                    <td>
                        <div class="d-flex flex-wrap gap-1 justify-content-center">
                            <button class="btn btn-sm btn-success flex-fill">
                                <i class="fa-solid fa-check"></i>
                            </button>
                            <button class="btn btn-sm btn-danger text-white flex-fill">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                    </td>
                    `
                break;

            case "Cancelado":
                buttons = `
                    <td>

                    </td>
                    `
                break;
            case "Pendiente":
                buttons = `
                    <td>
                        <div class="d-flex flex-wrap gap-1 justify-content-center">
                            <button class="btn btn-sm btn-info text-white flex-fill">
                                <i class="fa-solid fa-eye"></i>
                            </button>
                            <button class="btn btn-sm btn-danger text-white flex-fill">
                                <i class="fa-solid fa-xmark"></i>
                            </button>
                            <button class="btn btn-sm btn-warning text-white flex-fill">
                                <i class="fa-solid fa-money-bill"></i>
                            </button>
                        </div>
                    </td>
                    `
                break;
            default:
                break;
        }

        row.innerHTML = `
                    <td>${new Date(appointment.date).toLocaleString('es-ES')}</td>
                    <td>${appointment.patient}</td>
                    <td>${appointment.doctor}</td>
                    <td>${appointment.service}</td>
                    <td><span class="badge bg-${getStatusColor(appointment.status)}">${appointment.status}</span></td>
                    ${buttons}
                `;
    });
}

// Function to get status color
function getStatusColor(status) {
    switch (status) {
        case 'Pendiente': return 'warning';
        case 'Realizado': return 'success';
        case 'Cancelado': return 'danger';
        case 'Solicitado': return 'info';
        default: return 'secondary';
    }
}

// Function to add new appointment
document.getElementById('saveNewAppointment').addEventListener('click', function () {
    const date = document.getElementById('appointmentDate').value;
    const patient = document.getElementById('patientName').value;
    const doctor = document.getElementById('doctorSelect').options[document.getElementById('doctorSelect').selectedIndex].text;
    const service = document.getElementById('serviceSelect').options[document.getElementById('serviceSelect').selectedIndex].text;

    const newAppointment = {
        id: appointments.length + 1,
        date: date,
        patient: patient,
        doctor: doctor,
        service: service,
        status: 'Pendiente'
    };

    appointments.push(newAppointment);
    populateAppointmentsTable();

    let modal = bootstrap.Modal.getInstance(document.getElementById('newAppointmentModal'));
    modal.hide();
});

// Function to edit appointment
function editAppointment(id) {
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
        document.getElementById('editAppointmentId').value = appointment.id;
        document.getElementById('editAppointmentDate').value = appointment.date;
        document.getElementById('editPatientName').value = appointment.patient;
        document.getElementById('editDoctorSelect').value = appointment.doctor;
        document.getElementById('editServiceSelect').value = appointment.service;
        document.getElementById('editStatusSelect').value = appointment.status;

        let modal = new bootstrap.Modal(document.getElementById('editAppointmentModal'));
        modal.show();
    }
}

// Function to save edited appointment
document.getElementById('saveEditAppointment').addEventListener('click', function () {
    const id = parseInt(document.getElementById('editAppointmentId').value);
    const appointment = appointments.find(a => a.id === id);
    if (appointment) {
        appointment.date = document.getElementById('editAppointmentDate').value;
        appointment.patient = document.getElementById('editPatientName').value;
        appointment.doctor = document.getElementById('editDoctorSelect').options[document.getElementById('editDoctorSelect').selectedIndex].text;
        appointment.service = document.getElementById('editServiceSelect').options[document.getElementById('editServiceSelect').selectedIndex].text;
        appointment.status = document.getElementById('editStatusSelect').value;

        populateAppointmentsTable();

        let modal = bootstrap.Modal.getInstance(document.getElementById('editAppointmentModal'));
        modal.hide();
    }
});

// Function to delete appointment
function deleteAppointment(id) {
    if (confirm('¿Está seguro de que desea eliminar este turno?')) {
        appointments = appointments.filter(a => a.id !== id);
        populateAppointmentsTable();
    }
}

// Populate table on page load
document.addEventListener('DOMContentLoaded', function () {
    populateAppointmentsTable();
});

// Handle filter form submission
document.getElementById('filterForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically send a request to the server with the filter parameters
    // For this example, we'll just log the filter values
    const dateFilter = document.getElementById('dateFilter').value;
    const doctorFilter = document.getElementById('doctorFilter').value;
    const serviceFilter = document.getElementById('serviceFilter').value;
    const statusFilter = document.getElementById('statusFilter').value;

    console.log('Filtros aplicados:', { dateFilter, doctorFilter, serviceFilter, statusFilter });
    alert('Filtros aplicados. En una implementación real, esto actualizaría la lista de turnos.');
});