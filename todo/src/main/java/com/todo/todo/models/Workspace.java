package com.todo.todo.models;

import java.time.LocalDateTime;
import org.hibernate.annotations.Comment;

import com.todo.todo.organizations.Organization;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "workspaces")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Workspace {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    @Comment(value = "Organization to which the workspace belongs")
    private Organization organization;

    @Column(name = "name")
    @Comment(value = "Name of the workspace")
    private String name;

    @Column(name = "description")
    @Comment(value = "Description of the workspace")
    private String description;

    @Column(columnDefinition = "json")
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
