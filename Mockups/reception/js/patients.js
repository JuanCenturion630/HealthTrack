// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated patient data
let patients = [
    { id: 1, name: 'María González', dni: '12345678', birthdate: '1985-05-15', insurance: 'Sí', allergies: 'Penicilina' },
    { id: 2, name: 'Carlos Rodríguez', dni: '23456789', birthdate: '1990-10-20', insurance: 'Sí', allergies: 'Ninguna' },
    { id: 3, name: 'Ana Martínez', dni: '34567890', birthdate: '1978-03-08', insurance: 'No', allergies: 'Látex' }
];

// Function to populate patients table
function populatePatientsTable() {
    const tableBody = document.getElementById('patientsTableBody');
    tableBody.innerHTML = '';
    patients.forEach(patient => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.dni}</td>
                    <td>${calculateAge(patient.birthdate)}</td>
                    <td>${patient.insurance}</td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="viewPatientDetails(${patient.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deletePatient(${patient.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
    });
}

// Function to calculate age from birthdate
function calculateAge(birthdate) {
    const today = new Date();
    const birthDate = new Date(birthdate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

// Function to view patient details
function viewPatientDetails(patientId) {
    const patient = patients.find(p => p.id === patientId);
    if (patient) {
        document.getElementById('detailName').textContent = patient.name;
        document.getElementById('detailDNI').textContent = patient.dni;
        document.getElementById('detailAge').textContent = calculateAge(patient.birthdate);
        document.getElementById('detailInsurance').textContent = patient.insurance;
        document.getElementById('detailAllergies').textContent = patient.allergies;

        // Simulated appointment history
        const appointmentHistory = [
            { date: '2023-07-15', doctor: 'Dr. Juan Pérez', service: 'Consulta General' },
            { date: '2023-06-01', doctor: 'Dra. María López', service: 'Análisis de Sangre' }
        ];
        const appointmentList = document.getElementById('appointmentHistory');
        appointmentList.innerHTML = '';
        appointmentHistory.forEach(appointment => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.textContent = `${appointment.date} - ${appointment.doctor} - ${appointment.service}`;
            appointmentList.appendChild(li);
        });

        // Simulated payment history
        const paymentHistory = [
            { date: '2023-07-15', concept: 'Consulta General', amount: '$5000' },
            { date: '2023-06-01', concept: 'Análisis de Sangre', amount: '$3500' }
        ];
        const paymentTable = document.getElementById('paymentHistory');
        paymentTable.innerHTML = '';
        paymentHistory.forEach(payment => {
            const row = paymentTable.insertRow();
            row.innerHTML = `
                        <td>${payment.date}</td>
                        <td>${payment.concept}</td>
                        <td>${payment.amount}</td>
                    `;
        });

        let modal = new bootstrap.Modal(document.getElementById('patientDetailsModal'));
        modal.show();
    }
}

// Function to delete patient
function deletePatient(patientId) {
    if (confirm('¿Está seguro de que desea eliminar este paciente?')) {
        patients = patients.filter(p => p.id !== patientId);
        populatePatientsTable();
    }
}

// Function to add new patient
document.getElementById('saveNewPatient').addEventListener('click', function () {
    const name = document.getElementById('patientName').value;
    const dni = document.getElementById('patientDNI').value;
    const birthdate = document.getElementById('patientBirthdate').value;
    const insurance = document.getElementById('patientInsurance').value;
    const allergies = document.getElementById('patientAllergies').value;

    const newPatient = {
        id: patients.length + 1,
        name: name,
        dni: dni,
        birthdate: birthdate,
        insurance: insurance,
        allergies: allergies
    };

    patients.push(newPatient);
    populatePatientsTable();

    let modal = bootstrap.Modal.getInstance(document.getElementById('newPatientModal'));
    modal.hide();
});

// Handle search form submission
document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchName = document.getElementById('searchName').value.toLowerCase();
    const searchDNI = document.getElementById('searchDNI').value;

    const filteredPatients = patients.filter(patient =>
        patient.name.toLowerCase().includes(searchName) &&
        patient.dni.includes(searchDNI)
    );

    const tableBody = document.getElementById('patientsTableBody');
    tableBody.innerHTML = '';
    filteredPatients.forEach(patient => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${patient.name}</td>
                    <td>${patient.dni}</td>
                    <td>${calculateAge(patient.birthdate)}</td>
                    <td>${patient.insurance}</td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="viewPatientDetails(${patient.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deletePatient(${patient.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                `;
    });
});

// Populate table on page load
document.addEventListener('DOMContentLoaded', function () {
    populatePatientsTable();
});