CREATE TABLE horarios_laborales (
    horario_id INT AUTO_INCREMENT PRIMARY KEY,
    medico_id INT NOT NULL,
    dia TINYINT NOT NULL CHECK (dia BETWEEN 1 AND 7), -- 1 = Lunes, 7 = Domingo
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    UNIQUE (medico_id, dia, hora_inicio, hora_fin), -- Un médico no puede superponer horarios
    FOREIGN KEY (medico_id) REFERENCES medicos(medico_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

