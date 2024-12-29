package com.crm.crm.tickets;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.crm.crm.helpers.ApiResponse;

import java.util.List;

@RestController
@RequestMapping("/tickets")
public class TicketController {
    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<Ticket>>> index() {
        ApiResponse<List<Ticket>> response = this.ticketService.index();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Ticket>> show(@PathVariable Long id) {
        ApiResponse<Ticket> response = this.ticketService.show(id);
        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Ticket>> store(@RequestBody TicketDTO ticketDTO) {
        ApiResponse<Ticket> response = this.ticketService.store(ticketDTO);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Ticket>> update(
            @PathVariable Long id,
            @RequestBody TicketDTO ticketDTO) {
        ApiResponse<Ticket> response = this.ticketService.update(id, ticketDTO);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> destroy(@PathVariable Long id) {
        ApiResponse<Void> response = this.ticketService.destroy(id);
        return ResponseEntity.ok(response);
    }
}
