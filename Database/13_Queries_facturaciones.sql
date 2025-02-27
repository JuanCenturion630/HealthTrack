CREATE TABLE billings (
    billing_id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT NOT NULL UNIQUE, -- Each appointment should only be billed once
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    discount_id INT NULL,
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    payment_method VARCHAR(50) NOT NULL, -- Example: 'Cash', 'Card', 'Transfer'
    FOREIGN KEY (appointment_id) REFERENCES appointments(appointment_id) ON DELETE CASCADE,
    FOREIGN KEY (discount_id) REFERENCES discounts(discount_id) ON DELETE SET NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL
);

CREATE INDEX idx_billings_date ON billings (billing_date); -- Optimize search of invoices by date
CREATE INDEX idx_billings_payment_method ON billings (payment_method); -- Optimize searches of reports by payment method
