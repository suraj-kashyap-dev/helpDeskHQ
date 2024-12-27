package com.crm.crm.tickets;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import com.crm.crm.exceptions.resources.ResourceCreationException;
import com.crm.crm.exceptions.resources.ResourceUpdateException;
import com.crm.crm.exceptions.resources.ResourceDeletionException;
import com.crm.crm.helpers.ApiResponse;

import java.util.List;
import java.util.Optional;

@Service
public class TicketServiceImpl implements TicketService {
    private final TicketRepository ticketRepository;
    private final ModelMapper modelMapper;

    public TicketServiceImpl(TicketRepository ticketRepository, ModelMapper modelMapper) {
        this.ticketRepository = ticketRepository;
        this.modelMapper = modelMapper;
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
            Optional<Ticket> ticketOpt = ticketRepository.findById(id);
            return ticketOpt.map(ticket -> ApiResponse.success("Ticket retrieved successfully", ticket))
                    .orElseThrow(() -> new ResourceNotFoundException("Ticket not found"));
        } catch (Exception e) {
            throw new RuntimeException("Error retrieving ticket", e);
        }
    }

    @Override
    public ApiResponse<Ticket> store(TicketDTO ticketDTO) {
        try {
            Ticket ticket = modelMapper.map(ticketDTO, Ticket.class);
            Ticket savedTicket = ticketRepository.save(ticket);
            return ApiResponse.success("Ticket created successfully", savedTicket);
        } catch (Exception e) {
            throw new ResourceCreationException("Error creating ticket");
        }
    }

    @Override
    public ApiResponse<Ticket> update(Long id, TicketDTO ticketDTO) {
        try {
            Optional<Ticket> ticketOpt = ticketRepository.findById(id);
            if (ticketOpt.isEmpty()) {
                throw new ResourceNotFoundException("Ticket not found");
            }

            Ticket ticket = ticketOpt.get();
            modelMapper.map(ticketDTO, ticket);
            Ticket updatedTicket = ticketRepository.save(ticket);

            return ApiResponse.success("Ticket updated successfully", updatedTicket);
        } catch (Exception e) {
            throw new ResourceUpdateException("Error updating ticket");
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
