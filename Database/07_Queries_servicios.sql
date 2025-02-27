CREATE TABLE services (
    service_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    type_id INT NOT NULL,
    specialty_id INT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    estimated_duration INT,
    service_cost DECIMAL(9,2),
    FOREIGN KEY (type_id) REFERENCES service_types(service_type_id) ON DELETE CASCADE,
    FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE SET NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

CREATE INDEX idx_services_type ON services (type_id); -- Para consultas por tipo de servicio
CREATE INDEX idx_services_specialty ON services (specialty_id); -- Para filtrar servicios por especialidad
