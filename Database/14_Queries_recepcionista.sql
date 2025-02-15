CREATE TABLE recepcionistas (
    recepcionista_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL UNIQUE, -- Una recepcionista debe estar vinculada a un usuario único
    sueldo DECIMAL(10,2) NOT NULL CHECK (sueldo > 0),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE INDEX idx_recepcionista ON recepcionistas (usuario_id); -- Optimiza búsquedas de recepcionista por usuario