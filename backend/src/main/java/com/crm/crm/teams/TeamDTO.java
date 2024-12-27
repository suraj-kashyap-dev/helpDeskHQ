package com.crm.crm.teams;

import com.crm.crm.teams.enums.AccessLevel;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class TeamDTO {
    private Long id;

    @JsonProperty("workspace_id")
    private Long workspaceId;

    @JsonProperty("name")
    private String name;

    @JsonProperty("description")
    private String description;

    @JsonProperty("access_level")
    private AccessLevel accessLevel = AccessLevel.ADMIN;
}
