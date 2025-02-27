CREATE TABLE receptionists (
    receptionist_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE, -- A receptionist must be linked to a unique user
    salary DECIMAL(10,2) NOT NULL CHECK (salary > 0),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

CREATE INDEX idx_receptionist ON receptionists (user_id); -- Optimize searches for receptionists by user
