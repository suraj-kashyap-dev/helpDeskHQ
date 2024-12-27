package com.crm.crm.tickets;

import com.crm.crm.projects.Project;
import com.crm.crm.tickets.enums.TicketImpact;
import com.crm.crm.tickets.enums.TicketPriority;
import com.crm.crm.tickets.enums.TicketStatus;
import com.crm.crm.tickets.enums.TicketType;
import com.crm.crm.users.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.hibernate.annotations.Comment;

@Entity
@Table(name = "tickets")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "project_id", referencedColumnName = "id")
    @Comment(value = "Project")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "reporter_id", referencedColumnName = "id")
    @Comment(value = "Reporter")
    private User reporter;

    @ManyToOne
    @JoinColumn(name = "assignee_id", referencedColumnName = "id")
    @Comment(value = "Assignee")
    private User assignee;

    @Comment(value = "Title")
    private String title;

    @Comment(value = "Description")
    private String description;

    @Enumerated(EnumType.STRING)
    @Comment(value = "Ticket Type")
    private TicketType type;

    @Enumerated(EnumType.STRING)
    @Comment(value = "Ticket Priority")
    private TicketPriority priority;

    @Enumerated(EnumType.STRING)
    @Comment(value = "Ticket Status")
    private TicketStatus status;

    @Enumerated(EnumType.STRING)
    @Comment(value = "Impact")
    private TicketImpact impact;

    @Comment(value = "Estimated Hours")
    private BigDecimal estimatedHours;

    @Lob
    @Comment(value = "Custom Fields")
    private String customFields;

    @ManyToOne
    @JoinColumn(name = "parent_ticket_id", referencedColumnName = "id")
    @Comment(value = "Parent Ticket")
    private Ticket parentTicket;

    @Comment(value = "Position")
    private Integer position;

    @Comment(value = "Due Date")
    private LocalDateTime dueDate;

    @Comment(value = "Resolved At")
    private LocalDateTime resolvedAt;

    @Column(name = "created_at")
    @Comment(value = "Date and time when the organization was created")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @Comment(value = "Date and time when the organization was last updated")
    private LocalDateTime updatedAt;

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        this.createdAt = now;
        this.updatedAt = now;
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
