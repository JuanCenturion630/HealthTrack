// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated doctor data
const doctors = [
    {
        id: 1,
        name: "Dr. Juan Pérez",
        specialties: ["Cardiología", "Medicina Interna"],
        birthDate: "1975-05-15",
        schedule: [
            { day: "Lunes", hours: "9:00 - 14:00" },
            { day: "Miércoles", hours: "13:00 - 18:00" },
            { day: "Viernes", hours: "9:00 - 17:00" }
        ]
    },
    {
        id: 2,
        name: "Dra. María González",
        specialties: ["Pediatría", "Neonatología"],
        birthDate: "1980-08-22",
        schedule: [
            { day: "Martes", hours: "10:00 - 18:00" },
            { day: "Jueves", hours: "10:00 - 18:00" }
        ]
    },
    {
        id: 3,
        name: "Dr. Carlos Rodríguez",
        specialties: ["Traumatología", "Medicina Deportiva"],
        birthDate: "1972-11-30",
        schedule: [
            { day: "Lunes", hours: "8:00 - 13:00" },
            { day: "Miércoles", hours: "14:00 - 19:00" },
            { day: "Viernes", hours: "8:00 - 16:00" }
        ]
    }
];

function searchDoctors() {
    const searchTerm = document.getElementById('doctorSearch').value.toLowerCase();
    const specialtyFilter = document.getElementById('specialtyFilter').value.toLowerCase();
    const resultsContainer = document.getElementById('doctorResults');
    resultsContainer.innerHTML = '';

    const filteredDoctors = doctors.filter(doctor =>
        (doctor.name.toLowerCase().includes(searchTerm) || searchTerm === '') &&
        (specialtyFilter === '' || doctor.specialties.some(s => s.toLowerCase() === specialtyFilter))
    );

    if (filteredDoctors.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron médicos que coincidan con la búsqueda.</p>';
        return;
    }

    filteredDoctors.forEach(doctor => {
        const doctorCard = `
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-9">
                                    <h4>${doctor.name}</h4>
                                    <div class="mb-2">
                                        ${doctor.specialties.map(specialty => `<span class="specialty-badge">${specialty}</span>`).join('')}
                                    </div>
                                    <p><strong>Fecha de Nacimiento:</strong> ${doctor.birthDate}</p>
                                    <p><strong>Horarios:</strong></p>
                                    ${doctor.schedule.map(s => `
                                        <div class="schedule-item">
                                            <strong>${s.day}:</strong> ${s.hours}
                                        </div>
                                    `).join('')}
                                    <div class="mt-3">
                                        <button class="btn btn-primary btn-sm" onclick="openEditModal(1)"><i class="fas fa-edit"></i></button>
                                        <button class="btn btn-danger btn-sm" onclick="deleteDoctor(${doctor.id})"><i class="fas fa-trash-alt"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
        resultsContainer.innerHTML += doctorCard;
    });
}

function editDoctor(id) {
    // Implementar lógica para editar médico
    console.log(`Editar médico con ID: ${id}`);
}

function deleteDoctor(id) {
    // Implementar lógica para eliminar médico
    console.log(`Eliminar médico con ID: ${id}`);
}

// Mostrar/ocultar campos de horario según checkbox
document.querySelectorAll('.day-checkbox').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        const timeInputs = this.closest('.mb-3').querySelector('.time-inputs');
        if (this.checked) {
            timeInputs.style.display = 'block';
        } else {
            timeInputs.style.display = 'none';
        }
    });
});

// Función para cargar los datos actuales del médico en el modal
function loadDoctorData(doctorId) {
    // Simulación de datos del médico
    const doctorData = {
        schedule: {
            monday: { active: true, start: '08:00', end: '13:00' },
            wednesday: { active: true, start: '14:00', end: '19:00' },
            friday: { active: true, start: '08:00', end: '16:00' }
        },
        specialties: ['Traumatología', 'Medicina Deportiva']
    };

    // Cargar horarios
    if (doctorData.schedule.monday) {
        document.getElementById('monday').checked = true;
        document.querySelector('[name="mondayStart"]').value = doctorData.schedule.monday.start;
        document.querySelector('[name="mondayEnd"]').value = doctorData.schedule.monday.end;
        document.getElementById('mondayTimes').style.display = 'block';
    }

    if (doctorData.schedule.wednesday) {
        document.getElementById('wednesday').checked = true;
        document.querySelector('[name="wednesdayStart"]').value = doctorData.schedule.wednesday.start;
        document.querySelector('[name="wednesdayEnd"]').value = doctorData.schedule.wednesday.end;
        document.getElementById('wednesdayTimes').style.display = 'block';
    }

    if (doctorData.schedule.friday) {
        document.getElementById('friday').checked = true;
        document.querySelector('[name="fridayStart"]').value = doctorData.schedule.friday.start;
        document.querySelector('[name="fridayEnd"]').value = doctorData.schedule.friday.end;
        document.getElementById('fridayTimes').style.display = 'block';
    }

    // Cargar especialidades
    doctorData.specialties.forEach(specialty => {
        const checkbox = document.querySelector(`input[value="${specialty}"]`);
        if (checkbox) checkbox.checked = true;
    });
}

// Función para guardar los cambios
function saveChanges() {
    const formData = {
        schedule: {},
        specialties: []
    };

    // Recopilar horarios
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    days.forEach(day => {
        const checkbox = document.getElementById(day);
        if (checkbox.checked) {
            formData.schedule[day] = {
                active: true,
                start: document.querySelector(`[name="${day}Start"]`).value,
                end: document.querySelector(`[name="${day}End"]`).value
            };
        }
    });

    // Recopilar especialidades
    document.querySelectorAll('input[name="specialties"]:checked').forEach(checkbox => {
        formData.specialties.push(checkbox.value);
    });

    // Aquí normalmente enviarías los datos al servidor
    console.log('Datos a guardar:', formData);

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editDoctorModal'));
    modal.hide();

    // Mostrar mensaje de éxito
    alert('Cambios guardados exitosamente');
}

// Función para abrir el modal y cargar los datos
function openEditModal(doctorId) {
    loadDoctorData(doctorId);
    const modal = new bootstrap.Modal(document.getElementById('editDoctorModal'));
    modal.show();
}