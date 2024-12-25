package com.crm.crm.workspaces;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkspaceRepository extends JpaRepository<Workspace, Long> {
    public Workspace findByName(String name);

    public Workspace findByOrganizationId(Long organizationId);

    public Workspace findByOrganizationIdAndName(Long organizationId, String name);

    public Workspace findByOrganizationIdAndId(Long organizationId, Long id);

    public List<Workspace> findAllByOrderByCreatedAtDesc();
}
