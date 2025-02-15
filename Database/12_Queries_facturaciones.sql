CREATE TABLE facturaciones (
    facturacion_id INT AUTO_INCREMENT PRIMARY KEY,
    turno_id INT NOT NULL UNIQUE, -- Cada consulta debe facturarse solo una vez
    monto DECIMAL(10,2) NOT NULL CHECK (monto >= 0),
    descuento_id INT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    metodo_pago VARCHAR(50) NOT NULL, -- Ejemplo: 'Efectivo', 'Tarjeta', 'Transferencia'
    FOREIGN KEY (turno_id) REFERENCES turnos(turno_id) ON DELETE CASCADE,
    FOREIGN KEY (descuento_id) REFERENCES descuento(descuento_id) ON DELETE SET NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	deleted_at DATETIME NULL
);

CREATE INDEX idx_facturaciones_fecha ON facturaciones (fecha_facturacion); -- Optimiza búsqueda de facturas por fecha
CREATE INDEX idx_facturaciones_metodo_pago ON facturaciones (metodo_pago); -- Optimizar búsquedas de reportes según método de pago
