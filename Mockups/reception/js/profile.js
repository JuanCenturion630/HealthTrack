// Toggle Sidebar on Mobile
document.getElementById('sidebarToggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
    document.querySelector('.content').classList.toggle('active');
});

// Toggle Edit Mode
function toggleEditMode() {
    const inputs = document.querySelectorAll('#profileForm input');
    const saveButton = document.getElementById('saveButton');
    const editButton = document.querySelector('.btn-primary');

    inputs.forEach(input => {
        input.disabled = !input.disabled;
    });

    if (saveButton.style.display === 'none') {
        saveButton.style.display = 'block';
        editButton.textContent = 'Cancelar';
    } else {
        saveButton.style.display = 'none';
        editButton.textContent = 'Editar Perfil';
        // Reset form to original values
        document.getElementById('profileForm').reset();
    }
}

// Handle form submission
document.getElementById('profileForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Here you would typically send the data to a server
    console.log('Perfil actualizado');
    toggleEditMode(); // Exit edit mode
    // Update profile name
    document.getElementById('profileName').textContent = document.getElementById('fullName').value;
});