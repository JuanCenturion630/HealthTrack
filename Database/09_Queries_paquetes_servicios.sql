CREATE TABLE paquetes_servicios (
    paquete_servicio_id INT AUTO_INCREMENT PRIMARY KEY,
    servicio_id INT NOT NULL,
    paquete_codigo VARCHAR(50) NOT NULL,
    UNIQUE (servicio_id, paquete_codigo), -- Un mismo servicio no puede estar dos veces en el mismo paquete
    FOREIGN KEY (servicio_id) REFERENCES servicios(servicio_id) ON DELETE CASCADE,
    FOREIGN KEY (paquete_codigo) REFERENCES paquetes(codigo) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE INDEX idx_paquetes_servicios ON paquetes_servicios (paquete_codigo, servicio_id);
