package com.crm.crm.tickets;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Long>{
    public List<Ticket> findAllByOrderByCreatedAtDesc();
}
