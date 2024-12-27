package com.crm.crm.teams;

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
@RequestMapping("/teams")
public class TeamController {
    private final TeamService teamService;

    @Autowired
    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping
    public ApiResponse<List<Team>> index() {
        return this.teamService.index();
    }

    @GetMapping("/{id}")
    public ApiResponse<Team> show(@PathVariable Long id) {
        return this.teamService.show(id);
    }

    @PostMapping
    public ApiResponse<Team> store(@RequestBody TeamDTO teamDTO) {
        return this.teamService.store(teamDTO);
    }

    @PutMapping("/{id}")
    public ApiResponse<Team> update(@PathVariable Long id, @RequestBody TeamDTO teamDTO) {
        return this.teamService.update(id, teamDTO);
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> destroy(@PathVariable Long id) {
        return this.teamService.destroy(id);
    }
}