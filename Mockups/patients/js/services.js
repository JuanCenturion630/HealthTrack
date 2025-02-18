// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Set service name in modal
let appointmentModal = document.getElementById('appointmentModal')
appointmentModal.addEventListener('show.bs.modal', function (event) {
    let button = event.relatedTarget
    let serviceName = button.closest('tr') ?
        button.closest('tr').querySelector('td:first-child').textContent :
        button.closest('.package-card').querySelector('h5').textContent
    let modalServiceInput = appointmentModal.querySelector('#service')
    modalServiceInput.value = serviceName
})