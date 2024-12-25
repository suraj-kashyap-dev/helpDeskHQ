package com.crm.crm.models;

import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import com.crm.crm.organizations.Organization;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "organization_id")
    @Comment(value = "Organization to which the workspace belongs")
    private Organization organization;

    @Column(name = "email")
    @Comment(value = "Email of the user")
    private String email;

    @Column(name = "full_name")
    @Comment(value = "Full name of the user")
    private String fullName;

    @Column(name = "password")
    @Comment(value = "Password of the user")
    private String password;

    @Column(name = "phone")
    @Comment(value = "Phone number of the user")
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    @Comment(value = "Status of the user")
    private Status status;

    @Column(columnDefinition = "json")
    @Comment(value = "Preferences of the user")
    private String preferences;

    @Column(columnDefinition = "json")
    @Comment(value = "Notification settings of the user")
    private String notificationSettings;

    @Column(name = "last_login")
    @Comment(value = "Date and time when the user last logged in")
    private LocalDateTime lastLogin;

    @Column(name = "created_at")
    @Comment(value = "Date and time when the organization was created")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @Comment(value = "Date and time when the organization was last updated")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public enum Status {
        ACTIVE, INACTIVE, SUSPENDED
    }
}
