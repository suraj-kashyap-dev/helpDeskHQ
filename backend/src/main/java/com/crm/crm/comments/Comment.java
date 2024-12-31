package com.crm.crm.comments;

import com.crm.crm.tickets.Ticket;
import com.crm.crm.users.User;
import com.fasterxml.jackson.databind.JsonNode;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ticket_id", nullable = false)
    @org.hibernate.annotations.Comment(value = "Reference to the ticket this comment belongs to")
    private Ticket ticket;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sender", nullable = false)
    @org.hibernate.annotations.Comment(value = "Reference to the user who created the comment")
    private User sender;

    @Column(name = "type", nullable = false)
    @org.hibernate.annotations.Comment(value = "Type of the comment")
    private String type;

    @Column(name = "status", nullable = false)
    @org.hibernate.annotations.Comment(value = "Status of the comment")
    private String status;

    @Column(name = "status_update", columnDefinition = "JSON")
    @JdbcTypeCode(SqlTypes.JSON)
    private JsonNode statusUpdate;

    @Column(name = "mentions", columnDefinition = "JSON")
    @JdbcTypeCode(SqlTypes.JSON)
    private String mentions;

    @Column(name = "content", nullable = false, columnDefinition = "TEXT")
    @org.hibernate.annotations.Comment(value = "Content of the comment")
    private String content;

    @Column(name = "is_internal", nullable = false)
    @org.hibernate.annotations.Comment(value = "Indicates if the comment is internal (visible only to support team)")
    private Boolean isInternal = false;

    @Column(name = "is_resolution", nullable = false)
    @org.hibernate.annotations.Comment(value = "Indicates if the comment marks the resolution of the ticket")
    private Boolean isResolution = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    @org.hibernate.annotations.Comment(value = "Timestamp when the comment was created")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @org.hibernate.annotations.Comment(value = "Timestamp when the comment was last updated")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
