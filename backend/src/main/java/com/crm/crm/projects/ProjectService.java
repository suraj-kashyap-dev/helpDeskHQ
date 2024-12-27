package com.crm.crm.projects;

import java.util.List;
import com.crm.crm.helpers.ApiResponse;

public interface ProjectService {
    public ApiResponse<List<Project>> index();
    public ApiResponse<Project> show(Long id);
    public ApiResponse<Project> store(ProjectDTO ProjectDTO);
    public ApiResponse<Project> update(Long id, ProjectDTO Project);
    public ApiResponse<Void> destroy(Long id);
}
