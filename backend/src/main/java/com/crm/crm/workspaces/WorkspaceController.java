package com.crm.crm.workspaces;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.crm.crm.helpers.ApiResponse;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    @Autowired
    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping
    public ApiResponse<List<Workspace>> index() {
        return this.workspaceService.index();
    }

    @GetMapping("/{id}")
    public ApiResponse<Workspace> show(@PathVariable Long id) {
        return this.workspaceService.show(id);
    }

    @PostMapping
    public ApiResponse<Workspace> store(@RequestBody WorkspaceDTO workspaceDTO) {
        return this.workspaceService.store(workspaceDTO);
    }

    @PutMapping("/{id}")
    public ApiResponse<Workspace> update(@PathVariable Long id, @RequestBody WorkspaceDTO workspaceDTO) {
        return this.workspaceService.update(id, workspaceDTO);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> destroy(@PathVariable Long id) {
        return this.workspaceService.destroy(id);
    }
}
