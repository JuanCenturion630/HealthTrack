// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated data for charts
const appointmentsData = {
    day: [10, 15, 8, 12, 20, 18, 14],
    week: [80, 95, 88, 102, 75],
    month: [350, 420, 380, 450]
};

const incomeData = {
    day: [1000, 1500, 800, 1200, 2000, 1800, 1400],
    week: [8000, 9500, 8800, 10200, 7500],
    month: [35000, 42000, 38000, 45000]
};

const newPatientsData = {
    week: [5, 8, 6, 10, 7, 9, 11],
    month: [20, 25, 18, 30, 22]
};

const serviceIncomeData = {
    day: {
        labels: ['Consulta General', 'Análisis', 'Radiografía', 'Especialista'],
        data: [500, 800, 300, 1200]
    },
    month: {
        labels: ['Consulta General', 'Análisis', 'Radiografía', 'Especialista'],
        data: [15000, 24000, 9000, 36000]
    }
};

// Function to update Appointments Chart
function updateAppointmentsChart(period) {
    const ctx = document.getElementById('appointmentsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: period === 'day' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] :
                period === 'week' ? ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'] :
                    ['Ene', 'Feb', 'Mar', 'Abr'],
            datasets: [{
                label: 'Turnos Atendidos',
                data: appointmentsData[period],
                backgroundColor: 'rgba(0, 63, 89, 0.7)',
                borderColor: 'rgba(0, 63, 89, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update Income Chart
function updateIncomeChart(period) {
    const ctx = document.getElementById('incomeChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: period === 'day' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] :
                period === 'week' ? ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'] :
                    ['Ene', 'Feb', 'Mar', 'Abr'],
            datasets: [{
                label: 'Ingresos ($)',
                data: incomeData[period],
                borderColor: 'rgba(233, 181, 85, 1)',
                backgroundColor: 'rgba(233, 181, 85, 0.2)',
                borderWidth: 2,
                fill: true
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update New Patients Chart
function updateNewPatientsChart(period) {
    const ctx = document.getElementById('newPatientsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: period === 'week' ? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'] :
                ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
            datasets: [{
                label: 'Nuevos Pacientes',
                data: newPatientsData[period],
                backgroundColor: 'rgba(0, 63, 89, 0.7)',
                borderColor: 'rgba(0, 63, 89, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to update Service Income Chart
function updateServiceIncomeChart(period) {
    const ctx = document.getElementById('serviceIncomeChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: serviceIncomeData[period].labels,
            datasets: [{
                data: serviceIncomeData[period].data,
                backgroundColor: [
                    'rgba(0, 63, 89, 0.7)',
                    'rgba(233, 181, 85, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)'
                ],
                borderColor: [
                    'rgba(0, 63, 89, 1)',
                    'rgba(233, 181, 85, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Ganancias por Tipo de Servicio'
                }
            }
        }
    });
}

// Function to populate income details table
function populateIncomeDetailsTable() {
    const tableBody = document.getElementById('incomeDetailsTable');
    tableBody.innerHTML = '';
    const services = ['Consulta General', 'Análisis', 'Radiografía', 'Especialista'];
    services.forEach((service, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${service}</td>
                    <td>$${serviceIncomeData.day.data[index]}</td>
                    <td>$${serviceIncomeData.month.data[index]}</td>
                    <td>${Math.floor(serviceIncomeData.month.data[index] / 30)}</td>
                `;
    });
}

// Initialize charts and table on page load
document.addEventListener('DOMContentLoaded', function () {
    updateAppointmentsChart('day');
    updateIncomeChart('day');
    updateNewPatientsChart('week');
    updateServiceIncomeChart('day');
    populateIncomeDetailsTable();
});