CREATE TABLE recetas (
    receta_id INT PRIMARY KEY AUTO_INCREMENT,
    turno_id INT NOT NULL,
    foto VARCHAR(255) NULL,
    descripcion TEXT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    CONSTRAINT fk_recetas_turno FOREIGN KEY (turno_id) REFERENCES turnos(turno_id) ON DELETE CASCADE
);

CREATE INDEX idx_recetas_turno ON recetas (turno_id);