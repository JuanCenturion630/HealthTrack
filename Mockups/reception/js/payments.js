// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated payment data
let pendingPayments = [
    { id: 1, patient: 'Juan Pérez', amount: 150, dueDate: '2023-08-15' },
    { id: 2, patient: 'María García', amount: 200, dueDate: '2023-08-20' },
    { id: 3, patient: 'Carlos Rodríguez', amount: 100, dueDate: '2023-08-18' }
];

let completedPayments = [
    { id: 4, patient: 'Ana Martínez', amount: 180, paymentDate: '2023-08-10' },
    { id: 5, patient: 'Luis Sánchez', amount: 120, paymentDate: '2023-08-12' }
];

// Function to populate pending payments table
function populatePendingPayments() {
    const tableBody = document.getElementById('pendingPaymentsTable');
    tableBody.innerHTML = '';
    pendingPayments.forEach(payment => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${payment.patient}</td>
                    <td>$${payment.amount}</td>
                    <td>${payment.dueDate}</td>
                    <td>
                        <button class="btn btn-sm btn-info" onclick="viewTransactionHistory('${payment.patient}')">
                            <i class="fas fa-history"></i>
                        </button>
                    </td>
                `;
    });
}

// Function to populate completed payments table
function populateCompletedPayments() {
    const tableBody = document.getElementById('completedPaymentsTable');
    tableBody.innerHTML = '';
    completedPayments.forEach(payment => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${payment.patient}</td>
                    <td>$${payment.amount}</td>
                    <td>${payment.paymentDate}</td>
                `;
    });
}

// Function to mark a payment as paid
function markAsPaid(paymentId) {
    const paymentIndex = pendingPayments.findIndex(p => p.id === paymentId);
    if (paymentIndex !== -1) {
        const payment = pendingPayments[paymentIndex];
        payment.paymentDate = new Date().toISOString().split('T')[0];
        completedPayments.push(payment);
        pendingPayments.splice(paymentIndex, 1);
        populatePendingPayments();
        populateCompletedPayments();
    }
}

// Function to view transaction history
function viewTransactionHistory(patientName) {
    document.getElementById('patientNameHistory').textContent = `Paciente: Juan Pérez`;

    // Simulated transaction history
    const transactions = [
        { date: '2023-08-01', concept: 'Consulta General', amount: 100, status: 'Pagado' },
        { date: '2023-08-05', concept: 'Análisis de Sangre', amount: 150, status: 'Pendiente' },
        { date: '2023-08-10', concept: 'Radiografía', amount: 200, status: 'Pagado' }
    ];

    const tableBody = document.getElementById('transactionHistoryTable');
    tableBody.innerHTML = '';
    transactions.forEach(transaction => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${transaction.date}</td>
                    <td>${transaction.concept}</td>
                    <td>$${transaction.amount}</td>

                `;
    });

    let modal = new bootstrap.Modal(document.getElementById('transactionHistoryModal'));
    modal.show();
}

// Handle cash payment form submission
document.getElementById('cashPaymentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const patientName = document.getElementById('patientName').value;
    const amount = document.getElementById('paymentAmount').value;
    const concept = document.getElementById('paymentConcept').value;

    // Here you would typically send this data to your backend
    console.log('Nuevo pago en efectivo:', { patientName, amount, concept });

    // Add to completed payments (for demonstration)
    completedPayments.push({
        id: completedPayments.length + pendingPayments.length + 1,
        patient: patientName,
        amount: parseFloat(amount),
        paymentDate: new Date().toISOString().split('T')[0]
    });

    populateCompletedPayments();

    // Clear form
    document.getElementById('patientName').value = '';
    document.getElementById('paymentAmount').value = '';
    document.getElementById('paymentConcept').value = '';

    // Show confirmation message
    alert('Pago registrado correctamente');
});

// Populate tables on page load
document.addEventListener('DOMContentLoaded', function () {
    populatePendingPayments();
    populateCompletedPayments();
});