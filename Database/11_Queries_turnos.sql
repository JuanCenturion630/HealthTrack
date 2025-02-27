CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    patient_id INT NOT NULL,
    doctor_id INT NOT NULL,
    service_id INT NOT NULL,
    package_code VARCHAR(50) NULL,
    prescription_id INT NOT NULL,
    paid BOOLEAN DEFAULT FALSE,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- pending, confirmed, canceled, completed
    UNIQUE (doctor_id, date, time), -- A doctor cannot have two appointments at the same time
    FOREIGN KEY (patient_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    FOREIGN KEY (service_id) REFERENCES services(service_id) ON DELETE CASCADE,
    FOREIGN KEY (package_code) REFERENCES packages(code) ON DELETE SET NULL,
    FOREIGN KEY (prescription_id) REFERENCES prescriptions(prescription_id) ON DELETE SET NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

CREATE INDEX idx_appointments_patient ON appointments (patient_id); -- Optimizes search for appointments by patient
CREATE INDEX idx_appointments_status ON appointments (status); -- Optimizes search for appointments by status
CREATE INDEX idx_appointments_doctor_date ON appointments (doctor_id, date); -- Optimizes search for appointments by doctor on a specific date
CREATE INDEX idx_appointments_patient_date ON appointments (patient_id, date); -- Optimizes search for appointments of a patient on a given date
CREATE INDEX idx_appointments_specialty ON appointments (doctor_id, date, specialty_id);
