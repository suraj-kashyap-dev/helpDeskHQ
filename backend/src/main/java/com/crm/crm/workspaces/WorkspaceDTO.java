package com.crm.crm.workspaces;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class WorkspaceDTO {
    private Long id;

    @JsonProperty("organization_id")
    private Long organizationId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("settings")
    private String settings;
}
