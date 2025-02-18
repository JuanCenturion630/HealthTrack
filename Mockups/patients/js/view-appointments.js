// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated appointment data
const appointments = [
    {
        id: 1,
        date: "2023-06-15",
        time: "10:00",
        doctor: "Dr. Juan Pérez",
        specialty: "Cardiología",
        status: "upcoming"
    },
    {
        id: 2,
        date: "2023-06-20",
        time: "15:30",
        doctor: "Dra. María González",
        specialty: "Pediatría",
        status: "upcoming"
    },
    {
        id: 3,
        date: "2023-05-10",
        time: "11:00",
        doctor: "Dr. Carlos Rodríguez",
        specialty: "Traumatología",
        status: "past"
    },
    {
        id: 4,
        date: "2023-05-05",
        time: "09:30",
        doctor: "Dra. Ana Martínez",
        specialty: "Dermatología",
        status: "past"
    },
    {
        id: 5,
        date: "2023-06-25",
        time: "14:00",
        doctor: "Dr. Luis Sánchez",
        specialty: "Oftalmología",
        status: "upcoming"
    }
];

function displayAppointments(filteredAppointments) {
    const appointmentsList = document.getElementById('appointmentsList');
    appointmentsList.innerHTML = '';

    filteredAppointments.forEach(appointment => {
        const isPast = new Date(`${appointment.date}T${appointment.time}`) < new Date();
        const cardClass = isPast ? 'appointment-past' : '';
        const statusClass = appointment.status === 'upcoming' ? 'status-upcoming' : 'status-past';
        const statusText = appointment.status === 'upcoming' ? 'Próximo' : 'Pasado';

        const appointmentCard = `
                    <div class="card appointment-card ${cardClass} mb-3">
                        <div class="card-body">
                            <h5 class="card-title">${appointment.doctor} - ${appointment.specialty}</h5>
                            <p class="card-text">
                                <strong>Fecha:</strong> ${formatDate(appointment.date)} <br>
                                <strong>Hora:</strong> ${appointment.time} <br>
                                <span class="appointment-status ${statusClass}">${statusText}</span>
                            </p>
                        </div>
                    </div>
                `;
        appointmentsList.innerHTML += appointmentCard;
    });
}

function filterAppointments(filter) {
    let filteredAppointments;
    if (filter === 'all') {
        filteredAppointments = appointments;
    } else {
        filteredAppointments = appointments.filter(appointment => appointment.status === filter);
    }
    displayAppointments(filteredAppointments);
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}

function rescheduleAppointment(id) {
    // Implementar lógica para reprogramar turno
    console.log(`Reprogramar turno con ID: ${id}`);
}

function cancelAppointment(id) {
    // Implementar lógica para cancelar turno
    console.log(`Cancelar turno con ID: ${id}`);
}

// Inicializar la vista con todos los turnos
document.addEventListener('DOMContentLoaded', function () {
    filterAppointments('all');
});