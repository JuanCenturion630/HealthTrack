package com.healthtrack.model;

import com.healthtrack.model.ServiceType;
import com.healthtrack.model.Speciality;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "services", indexes = {
        @Index(name = "idx_services_type", columnList = "type_id"),
        @Index(name = "idx_services_specialty", columnList = "specialty_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "service_id")
    private Integer serviceId;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToOne
    @JoinColumn(name = "type_id", nullable = false)
    private ServiceType serviceType;

    @ManyToOne
    @JoinColumn(name = "specialty_id")
    private Speciality specialty;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "price", nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(name = "estimated_duration")
    private Integer estimatedDuration;

    @Column(name = "service_cost", precision = 9, scale = 2)
    private BigDecimal serviceCost;

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
