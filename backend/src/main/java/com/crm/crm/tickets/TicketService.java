package com.crm.crm.tickets;

import java.util.List;

import com.crm.crm.helpers.ApiResponse;

public interface TicketService {
    public ApiResponse<List<Ticket>> index();
    public ApiResponse<Ticket> show(Long id);
    public ApiResponse<Ticket> store(TicketDTO ticketDTO);
    public ApiResponse<Ticket> update(Long id, TicketDTO ticketDTO);
    public ApiResponse<Void> destroy(Long id);
}
