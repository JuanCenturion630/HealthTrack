CREATE TABLE work_schedules (
    schedule_id INT AUTO_INCREMENT PRIMARY KEY,
    doctor_id INT NOT NULL,
    day TINYINT NOT NULL CHECK (day BETWEEN 1 AND 7), -- 1 = Monday, 7 = Sunday
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    UNIQUE (doctor_id, day, start_time, end_time), -- A doctor cannot have overlapping schedules
    FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);
