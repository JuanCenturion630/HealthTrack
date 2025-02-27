CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE, -- Un médico debe estar vinculado a un usuario único
    specialty_id INT NOT NULL,
    salary DECIMAL(10,2) NOT NULL CHECK (salary > 0),
    license_number VARCHAR(50) UNIQUE NOT NULL, -- Número de matrícula profesional
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

CREATE INDEX idx_doctors_specialty ON doctors (specialty_id); -- Optimiza búsquedas de médicos por especialidad
