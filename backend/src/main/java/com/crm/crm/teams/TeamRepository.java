package com.crm.crm.teams;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
    public List<Team> findAllByOrderByCreatedAtDesc();
}
