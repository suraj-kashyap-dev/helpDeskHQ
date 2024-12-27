package com.crm.crm.tickets;

import org.springframework.stereotype.Service;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.helpers.ApiResponse;
import com.crm.crm.projects.ProjectRepository;
import com.crm.crm.tickets.mapper.TicketMapper;
import com.crm.crm.users.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final TicketMapper ticketMapper;

    public TicketServiceImpl(
        TicketRepository ticketRepository,
        ProjectRepository projectRespository,
        UserRepository userRepository,
        TicketMapper ticketMapper
    ) {
        this.ticketRepository = ticketRepository;
        this.ticketMapper = ticketMapper;
    }

    @Override
    public ApiResponse<List<Ticket>> index() {
        try {
            List<Ticket> tickets = ticketRepository.findAll();
            return ApiResponse.success("Tickets retrieved successfully", tickets);
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving tickets", e);
        }
    }

    @Override
    public ApiResponse<Ticket> show(Long id) {
        try {
            Optional<Ticket> ticketOpt = this.ticketRepository.findById(id);

            return ticketOpt.map(ticket -> ApiResponse.success("Ticket retrieved successfully", ticket))
                    .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving ticket", e);
        }
    }

    @Override
    public ApiResponse<Ticket> store(TicketDTO ticketDTO) {
        try {
            Ticket ticket = this.ticketMapper.toEntity(ticketDTO);

            return ApiResponse.success(
                "Ticket created successfully",
                this.ticketRepository.save(ticket)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceCreationException("Error creating ticket: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Ticket> update(Long id, TicketDTO ticketDTO) {
        try {
            Ticket existingTicket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
            
            Ticket updatedTicket = ticketMapper.toEntity(ticketDTO);

            updatedTicket.setId(id);
            updatedTicket.setCreatedAt(existingTicket.getCreatedAt());
            
            return ApiResponse.success(
                "Ticket updated successfully", 
                ticketRepository.save(updatedTicket)
            );
        } catch (ResourceNotFoundException e) {
            throw e;
        } catch (Exception e) {
            throw new ResourceUpdateException("Error updating ticket: " + e.getMessage());
        }
    }

    @Override
    public ApiResponse<Void> destroy(Long id) {
        try {
            if (!ticketRepository.existsById(id)) {
                throw new ResourceNotFoundException("Ticket not found");
            }
            ticketRepository.deleteById(id);
            return ApiResponse.success("Ticket deleted successfully", null);
        } catch (Exception e) {
            throw new ResourceDeletionException("Error deleting ticket");
        }
    }
}
