CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    telefono VARCHAR(20),
    direccion TEXT,
    fecha_nacimiento DATE,
    activo BOOLEAN DEFAULT TRUE,
    rol_id INT NOT NULL,
    alergias VARCHAR(100),
    antecedentes_medicos VARCHAR(255),
    FOREIGN KEY (rol_id) REFERENCES roles(rol_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE UNIQUE INDEX idx_usuarios_email ON usuarios (email); -- Búsqueda rápida por email
CREATE INDEX idx_usuarios_rol ON usuarios (rol_id); -- Optimiza filtración de usuarios por rol