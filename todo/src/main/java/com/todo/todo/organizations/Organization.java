package com.todo.todo.organizations;

import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "organizations")
public class Organization {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;

    @Column(name = "name")
    @Comment(value = "Name of the organization")
    private String name;

    @Column(name = "domain")
    @Comment(value = "Domain of the organization")
    private String domain;

    @Column(name = "subscription_type")
    @Comment(value = "Subscription type of the organization")
    private String subscriptionType;

    @Column(columnDefinition = "json")
    @Comment(value = "Settings of the organization")
    private String settings;

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
}
