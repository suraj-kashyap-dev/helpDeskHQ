package com.crm.crm.projects;

import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

import com.crm.crm.enums.ProjectStatus;
import com.crm.crm.workspaces.Workspace;

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
@Table(name = "projects")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "workspace_id")
    @Comment(value = "Workspace")
    private Workspace workspace;

    @Column(name = "name")
    @Comment(value = "Name of project")
    private String name;

    @Column(name = "description")
    @Comment(value = "Description of project")
    private String description;

    @Column(name = "status")
    @Comment(value = "Status of the Project")
    private ProjectStatus status;

    @Column(name = "settings", columnDefinition = "json")
    @Comment(value = "Project Settings")
    private String settings;

    @Column(name = "start_date")
    @Comment(value = "Start date of the project")
    private LocalDateTime startDate;

    @Column(name = "end_date")
    @Comment(value = "End date of the project")
    private LocalDateTime endDate;

    @Column(name = "created_at")
    @Comment(value = "Date and time when the project was created")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @Comment(value = "Date and time when the project was last updated")
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
