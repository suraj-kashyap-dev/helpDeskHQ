package com.crm.crm.projects;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.crm.crm.projects.enums.ProjectStatus;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    public List<Project> findAllByOrderByCreatedAtDesc();
    public List<Project> findAllByStatusOrderByCreatedAtDesc(ProjectStatus status);
}
