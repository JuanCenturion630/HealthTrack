// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated patient data
const patientData = {
    "María González": {
        name: "María González",
        age: "35 años",
        dni: "12345678",
        insurance: "Sí",
        history: "Hipertensión, Diabetes Tipo 2",
        allergies: "Penicilina, Maní",
        consultations: [
            { date: "2023-07-15", service: "Control de Presión Arterial", medicalPrescription: "Ajuste de medicación" },
            { date: "2023-05-20", service: "Electrocardiograma", medicalPrescription: "Omeprazol 20mg/día por 2 semanas" },
            { date: "2023-03-10", service: "Control de Diabetes", medicalPrescription: "Reposo y antiviral" }
        ]
    },
    "Carlos Rodríguez": {
        name: "Carlos Rodríguez",
        age: "42 años",
        dni: "23456789",
        insurance: "No",
        history: "Asma",
        allergies: "Polen",
        consultations: [
            { date: "2023-06-30", service: "Consulta General", medicalPrescription: "Inhalador de rescate y seguimiento" },
            { date: "2023-04-05", service: "Vacunación", medicalPrescription: "Continuar con medicación habitual" }
        ]
    }
};

function searchPatient() {
    const searchTerm = document.getElementById('searchPatient').value.trim();
    const patientInfo = document.getElementById('patientInfo');
    const consultationHistory = document.getElementById('consultationHistory');

    if (patientData[searchTerm]) {
        const patient = patientData[searchTerm];
        document.getElementById('patientName').textContent = patient.name;
        document.getElementById('patientAge').textContent = patient.age;
        document.getElementById('patientDNI').textContent = patient.dni;
        document.getElementById('patientInsurance').textContent = patient.insurance;
        document.getElementById('patientHistory').textContent = patient.history;
        document.getElementById('patientAllergies').textContent = patient.allergies;

        const tableBody = document.getElementById('consultationTableBody');
        tableBody.innerHTML = '';
        patient.consultations.forEach(consultation => {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = consultation.date;
            row.insertCell(1).textContent = consultation.service;
            row.insertCell(2).textContent = consultation.medicalPrescription;
        });

        patientInfo.style.display = 'block';
        consultationHistory.style.display = 'block';
    } else {
        alert('Paciente no encontrado. Por favor, intente de nuevo.');
        patientInfo.style.display = 'none';
        consultationHistory.style.display = 'none';
    }
}