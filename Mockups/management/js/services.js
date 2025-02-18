// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Simulated service data
let services = [
    { id: 1, name: 'Consulta General', price: 50, priceDoctor: 30000, duration: 30, description: 'Consulta médica general' },
    { id: 2, name: 'Análisis de Sangre', price: 80, priceDoctor: 20000, duration: 50, description: 'Análisis completo de sangre' },
    { id: 3, name: 'Radiografía', price: 120, priceDoctor: 60000, duration: 15, description: 'Radiografía general' }
];

// Simulated package data
let packages = [
    { id: 1, name: 'Chequeo Básico', price: 150, priceDoctor: 140000, duration: 45, services: [1, 2] },
    { id: 2, name: 'Chequeo Completo', price: 250, priceDoctor: 300000, duration: 105, services: [1, 2, 3] }
];

// Function to populate services table
function populateServicesTable() {
    const tableBody = document.getElementById('servicesTable');
    tableBody.innerHTML = '';
    services.forEach(service => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${service.name}</td>
                    <td>$${service.price}</td>
                    <td>$${service.priceDoctor}</td>
                    <td>${service.duration} minutos</td>
                    <td>
                        <button class="btn btn-sm btn-primary me-1" onclick="editService(${service.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
    });
}

// Function to populate packages table
function populatePackagesTable() {
    const tableBody = document.getElementById('packagesTable');
    tableBody.innerHTML = '';
    packages.forEach(p => {
        const row = tableBody.insertRow();
        row.innerHTML = `
                    <td>${p.name}</td>
                    <td>$${p.price}</td>
                    <td>$${p.priceDoctor}</td>
                    <td>${p.duration} minutos</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editPackage(${p.id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn btn-sm btn-danger">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </td>
                `;
    });
}

// Function to edit service
function editService(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        document.getElementById('editServiceId').value = service.id;
        document.getElementById('editServiceName').value = service.name;
        document.getElementById('editServicePrice').value = service.price;
        document.getElementById('editServiceDescription').value = service.description;

        let modal = new bootstrap.Modal(document.getElementById('editServiceModal'));
        modal.show();
    }
}

// Function to save service changes
function saveServiceChanges() {
    const serviceId = parseInt(document.getElementById('editServiceId').value);
    const serviceName = document.getElementById('editServiceName').value;
    const servicePrice = parseFloat(document.getElementById('editServicePrice').value);
    const serviceDescription = document.getElementById('editServiceDescription').value;

    const serviceIndex = services.findIndex(s => s.id === serviceId);
    if (serviceIndex !== -1) {
        services[serviceIndex] = { ...services[serviceIndex], name: serviceName, price: servicePrice, description: serviceDescription };
        populateServicesTable();
        let modal = bootstrap.Modal.getInstance(document.getElementById('editServiceModal'));
        modal.hide();
    }
}

// Function to edit package
function editPackage(packageId) {
    const p = packages.find(p => p.id === packageId);
    if (p) {
        document.getElementById('editPackageId').value = p.id;
        document.getElementById('editPackageName').value = p.name;
        document.getElementById('editPackagePrice').value = p.price;

        const servicesSelect = document.getElementById('editPackageServices');
        servicesSelect.innerHTML = '';
        services.forEach(service => {
            const option = document.createElement('option');
            option.value = service.id;
            option.textContent = service.name;
            option.selected = p.services.includes(service.id);
            servicesSelect.appendChild(option);
        });

        let modal = new bootstrap.Modal(document.getElementById('editPackageModal'));
        modal.show();
    }
}

// Function to save package changes
function savePackageChanges() {
    const packageId = parseInt(document.getElementById('editPackageId').value);
    const packageName = document.getElementById('editPackageName').value;
    const packagePrice = parseFloat(document.getElementById('editPackagePrice').value);
    const selectedServices = Array.from(document.getElementById('editPackageServices').selectedOptions).map(option => parseInt(option.value));

    const packageIndex = packages.findIndex(p => p.id === packageId);
    if (packageIndex !== -1) {
        packages[packageIndex] = { ...packages[packageIndex], name: packageName, price: packagePrice, services: selectedServices };
        populatePackagesTable();
        let modal = bootstrap.Modal.getInstance(document.getElementById('editPackageModal'));
        modal.hide();
    }
}

// Function to view appointments for a service
function viewAppointments(serviceId) {
    const service = services.find(s => s.id === serviceId);
    if (service) {
        document.getElementById('serviceNameAppointments').textContent = `Servicio: ${service.name}`;

        // Simulated appointments data
        const appointments = [
            { date: '2023-08-15', time: '09:00', patient: 'Juan Pérez', status: 'Confirmado' },
            { date: '2023-08-15', time: '10:00', patient: 'María García', status: 'Pendiente' },
            { date: '2023-08-16', time: '11:00', patient: 'Carlos Rodríguez', status: 'Confirmado' }
        ];

        const tableBody = document.getElementById('appointmentsTable');
        tableBody.innerHTML = '';
        appointments.forEach(appointment => {
            const row = tableBody.insertRow();
            row.innerHTML = `
                        <td>${appointment.date}</td>
                        <td>${appointment.time}</td>
                        <td>${appointment.patient}</td>
                        <td>${appointment.status}</td>
                    `;
        });

        let modal = new bootstrap.Modal(document.getElementById('appointmentsModal'));
        modal.show();
    }
}

// Function to show add service modal
function showAddServiceModal() {
    document.getElementById('addServiceForm').reset();
    let modal = new bootstrap.Modal(document.getElementById('addServiceModal'));
    modal.show();
}

// Function to add new service
function addNewService() {
    const serviceName = document.getElementById('newServiceName').value;
    const servicePrice = parseFloat(document.getElementById('newServicePrice').value);
    const serviceDescription = document.getElementById('newServiceDescription').value;

    const newService = {
        id: services.length + 1,
        name: serviceName,
        price: servicePrice,
        description: serviceDescription
    };

    services.push(newService);
    populateServicesTable();

    let modal = bootstrap.Modal.getInstance(document.getElementById('addServiceModal'));
    modal.hide();
}

// Function to show add package modal
function showAddPackageModal() {
    document.getElementById('addPackageForm').reset();
    const servicesSelect = document.getElementById('newPackageServices');
    servicesSelect.innerHTML = '';
    services.forEach(service => {
        const option = document.createElement('option');
        option.value = service.id;
        option.textContent = service.name;
        servicesSelect.appendChild(option);
    });
    let modal = new bootstrap.Modal(document.getElementById('addPackageModal'));
    modal.show();
}

// Function to add new package
function addNewPackage() {
    const packageName = document.getElementById('newPackageName').value;
    const packagePrice = parseFloat(document.getElementById('newPackagePrice').value);
    const selectedServices = Array.from(document.getElementById('newPackageServices').selectedOptions).map(option => parseInt(option.value));

    const newPackage = {
        id: packages.length + 1,
        name: packageName,
        price: packagePrice,
        services: selectedServices
    };

    packages.push(newPackage);
    populatePackagesTable();

    let modal = bootstrap.Modal.getInstance(document.getElementById('addPackageModal'));
    modal.hide();
}

// Populate tables on page load
document.addEventListener('DOMContentLoaded', function () {
    populateServicesTable();
    populatePackagesTable();
});