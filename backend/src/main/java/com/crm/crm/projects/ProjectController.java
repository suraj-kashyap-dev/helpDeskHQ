package com.crm.crm.projects;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.projects.enums.ProjectStatus;

@RestController
@RequestMapping("/projects")
public class ProjectController {
    private final ProjectService projectService;

    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Project>>> index(@RequestParam(required = false) ProjectStatus status) {
        ApiResponse<List<Project>> response = projectService.index(status);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> show(@PathVariable Long id) {
        ApiResponse<Project> response = projectService.show(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Project>> store(@RequestBody ProjectDTO projectDto) {
        System.out.println(projectDto);
        ApiResponse<Project> response = projectService.store(projectDto);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Project>> update(
        @PathVariable Long id, 
        @RequestBody ProjectDTO projectDto
    ) {
        ApiResponse<Project> response = projectService.update(id, projectDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> response = projectService.destroy(id);
        return ResponseEntity.ok(response);
    }
}
