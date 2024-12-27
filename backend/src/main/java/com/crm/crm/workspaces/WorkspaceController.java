package com.crm.crm.workspaces;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;

@RestController
@RequestMapping("/workspaces")
public class WorkspaceController {
    private final WorkspaceService workspaceService;

    public WorkspaceController(WorkspaceService workspaceService) {
        this.workspaceService = workspaceService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Workspace>>> index() {
        ApiResponse<List<Workspace>> response = workspaceService.index();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Workspace>> show(@PathVariable Long id) {
        ApiResponse<Workspace> response = workspaceService.show(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Workspace>> store(@RequestBody WorkspaceDTO workspaceDTO) {
        ApiResponse<Workspace> response = workspaceService.store(workspaceDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Workspace>> update(
        @PathVariable Long id,
        @RequestBody WorkspaceDTO workspaceDTO
    ) {
        ApiResponse<Workspace> response = workspaceService.update(id, workspaceDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> response = workspaceService.destroy(id);
        return ResponseEntity.ok(response);
    }
}
