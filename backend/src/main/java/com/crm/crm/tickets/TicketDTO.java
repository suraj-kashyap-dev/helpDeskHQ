package com.crm.crm.tickets;

import java.math.BigDecimal;

import com.crm.crm.tickets.enums.TicketImpact;
import com.crm.crm.tickets.enums.TicketPriority;
import com.crm.crm.tickets.enums.TicketStatus;
import com.crm.crm.tickets.enums.TicketType;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class TicketDTO {
    @JsonProperty("project_id")
    private Long projectId;

    @JsonProperty("reporter_id")
    private Long reporterId;

    @JsonProperty("assignee_id")
    private Long assigneeId;

    @JsonProperty("title")
    private String title;

    @JsonProperty("description")
    private String description;

    @JsonProperty("type")
    private TicketType type;

    @JsonProperty("priority")
    private TicketPriority priority;

    @JsonProperty("status")
    private TicketStatus status;

    @JsonProperty("impact")
    private TicketImpact impact;

    @JsonProperty("estimated_hours")
    private BigDecimal estimatedHours;

    @JsonProperty("custom_fields")
    private String customFields;

    @JsonProperty("parent_ticket_id")
    private Long parentTicketId;

    @JsonProperty("position")
    private Integer position;

    @JsonProperty("due_date")
    private String dueDate;

    @JsonProperty("resolve_at")
    private String resolvedAt;
}