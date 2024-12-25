package com.crm.crm.workspaces;

import lombok.Data;

@Data
public class WorkspaceDTO {
    private Long organization_id;
    private String name;
    private String description;
    private String settings;
}
