package com.crm.crm.projects;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {
    public List<Project> findAllByOrderByCreatedAtDesc();
}
