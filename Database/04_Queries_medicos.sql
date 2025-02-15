CREATE TABLE medicos (
    medico_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE, -- Un médico debe estar vinculado a un usuario único
    especialidad_id INT NOT NULL,
    sueldo DECIMAL(10,2) NOT NULL CHECK (sueldo > 0),
    matricula VARCHAR(50) UNIQUE NOT NULL, -- Número de matrícula profesional
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(especialidad_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE INDEX idx_medicos_especialidad ON medicos (especialidad_id); -- Optimiza búsquedas de médicos por especialidad