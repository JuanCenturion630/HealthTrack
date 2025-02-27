CREATE TABLE package_services (
    package_service_id INT AUTO_INCREMENT PRIMARY KEY,
    service_id INT NOT NULL,
    package_code VARCHAR(50) NOT NULL,
    UNIQUE (service_id, package_code), -- A service cannot appear twice in the same package
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE,
    FOREIGN KEY (package_code) REFERENCES packages(code) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

CREATE INDEX idx_package_services ON package_services (package_code, service_id);
