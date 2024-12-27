package com.crm.crm.projects;

import java.time.LocalDateTime;

import com.crm.crm.enums.ProjectStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class ProjectDTO {
    private Long id;

    @JsonProperty("workspace_id")
    private Long workspaceId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("status")
    private ProjectStatus status = ProjectStatus.ACTIVE;

    @JsonProperty("settings")
    private String settings;

    @JsonProperty("start_date")
    private LocalDateTime startDate;

    @JsonProperty("end_date")
    private LocalDateTime endDate;
}
