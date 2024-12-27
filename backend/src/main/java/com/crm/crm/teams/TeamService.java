package com.crm.crm.teams;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface TeamService {
    public ApiResponse<List<Team>> index();
    public ApiResponse<Team> show(Long id);
    public ApiResponse<Team> store(TeamDTO teamDTO);
    public ApiResponse<Team> update(Long id, TeamDTO teamDTO);
    public ApiResponse<Void> destroy(Long id);
}
