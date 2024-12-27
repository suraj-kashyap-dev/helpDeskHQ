package com.crm.crm.teams;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;

@RestController
@RequestMapping("/teams")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Team>>> index() {
        ApiResponse<List<Team>> response = teamService.index();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Team>> show(@PathVariable Long id) {
        ApiResponse<Team> response = teamService.show(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Team>> store(@RequestBody TeamDTO teamDTO) {
        ApiResponse<Team> response = teamService.store(teamDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Team>> update(
        @PathVariable Long id, 
        @RequestBody TeamDTO teamDTO
    ) {
        ApiResponse<Team> response = teamService.update(id, teamDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> response = teamService.destroy(id);
        return ResponseEntity.ok(response);
    }
}
