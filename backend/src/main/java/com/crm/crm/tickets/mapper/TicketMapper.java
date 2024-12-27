package com.crm.crm.tickets.mapper;

import com.crm.crm.tickets.Ticket;
import com.crm.crm.tickets.TicketDTO;
import com.crm.crm.tickets.TicketRepository;
import com.crm.crm.projects.ProjectRepository;
import com.crm.crm.users.UserRepository;
import com.crm.crm.configs.EntityMapper;
import com.crm.crm.exceptions.resources.ResourceNotFoundException;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class TicketMapper implements EntityMapper<TicketDTO, Ticket> {
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final TicketRepository ticketRepository;
    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    public TicketMapper(
        ProjectRepository projectRepository,
        UserRepository userRepository,
        TicketRepository ticketRepository
    ) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.ticketRepository = ticketRepository;
    }

    @Override
    public Ticket toEntity(TicketDTO dto) {
        if (dto == null) {
            return null;
        }

        Ticket ticket = new Ticket();
        
        ticket.setTitle(dto.getTitle());
        ticket.setDescription(dto.getDescription());
        ticket.setType(dto.getType());
        ticket.setPriority(dto.getPriority());
        ticket.setStatus(dto.getStatus());
        ticket.setImpact(dto.getImpact());
        ticket.setEstimatedHours(dto.getEstimatedHours());
        ticket.setCustomFields(dto.getCustomFields());
        ticket.setPosition(dto.getPosition());
        
        if (dto.getDueDate() != null) {
            ticket.setDueDate(LocalDateTime.parse(dto.getDueDate(), DATE_FORMATTER));
        }
        if (dto.getResolvedAt() != null) {
            ticket.setResolvedAt(LocalDateTime.parse(dto.getResolvedAt(), DATE_FORMATTER));
        }

        mapRelationships(dto, ticket);

        return ticket;
    }

    @Override
    public TicketDTO toDto(Ticket entity) {
        if (entity == null) {
            return null;
        }

        TicketDTO dto = new TicketDTO();
        
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setType(entity.getType());
        dto.setPriority(entity.getPriority());
        dto.setStatus(entity.getStatus());
        dto.setImpact(entity.getImpact());
        dto.setEstimatedHours(entity.getEstimatedHours());
        dto.setCustomFields(entity.getCustomFields());
        dto.setPosition(entity.getPosition());
        
        if (entity.getProject() != null) {
            dto.setProjectId(entity.getProject().getId());
        }
        if (entity.getReporter() != null) {
            dto.setReporterId(entity.getReporter().getId());
        }
        if (entity.getAssignee() != null) {
            dto.setAssigneeId(entity.getAssignee().getId());
        }
        if (entity.getParentTicket() != null) {
            dto.setParentTicketId(entity.getParentTicket().getId());
        }

        if (entity.getDueDate() != null) {
            dto.setDueDate(entity.getDueDate().format(DATE_FORMATTER));
        }
        if (entity.getResolvedAt() != null) {
            dto.setResolvedAt(entity.getResolvedAt().format(DATE_FORMATTER));
        }

        return dto;
    }

    @Override
    public List<Ticket> toEntity(List<TicketDTO> dtoList) {
        return dtoList.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Override
    public List<TicketDTO> toDto(List<Ticket> entityList) {
        return entityList.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private void mapRelationships(TicketDTO dto, Ticket ticket) {
        if (dto.getProjectId() != null) {
            ticket.setProject(projectRepository.findById(dto.getProjectId())
                    .orElseThrow(() -> new ResourceNotFoundException("Project not found")));
        }

        if (dto.getReporterId() != null) {
            ticket.setReporter(userRepository.findById(dto.getReporterId())
                    .orElseThrow(() -> new ResourceNotFoundException("Reporter not found")));
        }

        if (dto.getAssigneeId() != null) {
            ticket.setAssignee(userRepository.findById(dto.getAssigneeId())
                    .orElseThrow(() -> new ResourceNotFoundException("Assignee not found")));
        }

        if (dto.getParentTicketId() != null) {
            ticket.setParentTicket(ticketRepository.findById(dto.getParentTicketId())
                    .orElseThrow(() -> new ResourceNotFoundException("Parent Ticket not found")));
        }
    }
}
