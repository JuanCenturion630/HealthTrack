// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated receptionist data
let receptionists = [
    {
        id: 1,
        name: "Ana García",
        email: "ana.garcia@healthtrack.com",
        phone: "123-456-7890",
        schedule: { start: "08:00", end: "18:00" },
        salary: 2500
    },
    {
        id: 2,
        name: "Carlos Rodríguez",
        email: "carlos.rodriguez@healthtrack.com",
        phone: "098-765-4321",
        schedule: { start: "08:00", end: "18:00" },
        salary: 2500
    },
    {
        id: 3,
        name: "Laura Martínez",
        email: "laura.martinez@healthtrack.com",
        phone: "456-789-0123",
        schedule: { start: "08:00", end: "18:00" },
        salary: 2500
    }
];

function displayReceptionists() {
    const receptionistsList = document.getElementById('receptionistsList');
    receptionistsList.innerHTML = '';

    receptionists.forEach(receptionist => {
        const receptionistCard = `
                    <div class="col-md-4 mb-4">
                        <div class="card receptionist-card">
                            <div class="card-body">
                                <h5 class="card-title">${receptionist.name}</h5>
                                <p class="card-text">
                                    <p><i class="fa-solid fa-envelope me-2"></i> ${receptionist.email}</p>
                                    <p><i class="fa-solid fa-phone me-2"></i> ${receptionist.phone}</p>
                                    <p><i class="fas fa-clock me-2"></i> Lunes a Sábados, 8:00 - 18:00</p>
                                    <p><i class="fas fa-money-bill me-2"></i> $250000</p>
                                </p>
                                <button class="btn btn-primary btn-sm" onclick="openEditModal(1)">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="deleteReceptionist(${receptionist.id})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `;
        receptionistsList.innerHTML += receptionistCard;
    });
}

function addReceptionist() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const shift = document.getElementById('shift');
    const shiftText = shift.options[shift.selectedIndex].text;

    const newReceptionist = {
        id: receptionists.length + 1,
        name: name,
        email: email,
        phone: phone,
        shift: shiftText
    };

    receptionists.push(newReceptionist);
    displayReceptionists();

    // Cerrar el modal y limpiar el formulario
    const modal = bootstrap.Modal.getInstance(document.getElementById('addReceptionistModal'));
    modal.hide();
    document.getElementById('addReceptionistForm').reset();
}

function deleteReceptionist(id) {
    if (confirm('¿Está seguro de que desea eliminar este recepcionista?')) {
        receptionists = receptionists.filter(receptionist => receptionist.id !== id);
        displayReceptionists();
    }
}

// Inicializar la vista con los recepcionistas existentes
document.addEventListener('DOMContentLoaded', function () {
    displayReceptionists();
});

let currentReceptionistId = null;

function openEditModal(id) {
    currentReceptionistId = id;
    const receptionist = receptionists[id];

    // Cargar datos actuales en el modal
    document.getElementById('startTime').value = receptionist.schedule.start;
    document.getElementById('endTime').value = receptionist.schedule.end;
    document.getElementById('salary').value = receptionist.salary;

    // Actualizar título del modal
    document.getElementById('editReceptionistModalLabel').textContent =
        `Editar Recepcionista - ${receptionist.name}`;

    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('editReceptionistModal'));
    modal.show();
}

function saveChanges() {
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const salary = document.getElementById('salary').value;

    // Validar que la hora de fin sea posterior a la hora de inicio
    if (startTime >= endTime) {
        alert('La hora de fin debe ser posterior a la hora de inicio');
        return;
    }

    // Validar que el salario sea un número positivo
    if (salary <= 0) {
        alert('El salario debe ser mayor que 0');
        return;
    }

    // Actualizar datos (en una aplicación real, esto se enviaría al servidor)
    receptionists[currentReceptionistId].schedule.start = startTime;
    receptionists[currentReceptionistId].schedule.end = endTime;
    receptionists[currentReceptionistId].salary = salary;

    // Cerrar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('editReceptionistModal'));
    modal.hide();

    // Mostrar mensaje de éxito
    alert('Cambios guardados exitosamente');

    // En una aplicación real, aquí actualizarías la vista con los nuevos datos
    location.reload(); // Esto es temporal, en una aplicación real actualizarías solo los datos necesarios
}