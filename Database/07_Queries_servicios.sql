CREATE TABLE servicios (
    servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    tipo_id INT NOT NULL,
    especialidad_id INT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    duracion_estimada INT,
    costo_servicio DECIMAL(9,2),
    FOREIGN KEY (tipo_id) REFERENCES servicios_tipos(servicio_tipo_id) ON DELETE CASCADE,
    FOREIGN KEY (especialidad_id) REFERENCES especialidades(especialidad_id) ON DELETE SET NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE INDEX idx_servicios_tipo ON servicios (tipo_id); -- Para consultas por tipo de servicio
CREATE INDEX idx_servicios_especialidad ON servicios (especialidad_id); -- Para filtrar servicios por especialidad
