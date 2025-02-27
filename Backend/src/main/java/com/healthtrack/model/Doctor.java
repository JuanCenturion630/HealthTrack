package com.healthtrack.model;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Doctor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_id")
    private Integer doctorId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user; // Un médico está vinculado a un usuario único

    @ManyToOne
    @JoinColumn(name = "specialty_id", nullable = false)
    private Speciality specialty;

    @Column(name = "salary", nullable = false)
    private BigDecimal salary;

    @Column(name = "license_number", nullable = false, unique = true)
    private String licenseNumber; // Número de matrícula profesional

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = createdAt;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
