CREATE TABLE turnos (
    turno_id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    paciente_id INT NOT NULL,
    medico_id INT NOT NULL,
    servicio_id INT NOT NULL,
    paquete_id VARCHAR(50) NULL,
    receta_id INT NOT NULL,
    pagado BOOLEAN DEFAULT FALSE,
	estado VARCHAR(20) NOT NULL DEFAULT 'pendiente', -- pendiente, confirmado, cancelado, realizado
    UNIQUE (medico_id, fecha, hora), -- Un médico no puede tener dos turnos a la misma hora
    FOREIGN KEY (paciente_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    FOREIGN KEY (medico_id) REFERENCES medicos(medico_id) ON DELETE CASCADE,
    FOREIGN KEY (servicio_id) REFERENCES servicios(servicio_id) ON DELETE CASCADE,
    FOREIGN KEY (paquete_id) REFERENCES paquetes(codigo) ON DELETE SET NULL,
	FOREIGN KEY (receta_id) REFERENCES recetas(receta_id) ON DELETE SET NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE INDEX idx_turnos_paciente ON turnos (paciente_id); -- Optimiza búsquedas de turnos por paciente
CREATE INDEX idx_turnos_estado ON turnos (estado); -- Optimiza búsquedas de turnos por estado
CREATE INDEX idx_turnos_medico_fecha ON turnos (medico_id, fecha); -- Optimiza búsqueda de turnos por médico en una fecha específica
CREATE INDEX idx_turnos_paciente_fecha ON turnos (paciente_id, fecha); -- Optimiza búsqueda de turnos de un paciente en una fecha dada
CREATE INDEX idx_turnos_especialidad ON turnos (medico_id, fecha, especialidad_id);