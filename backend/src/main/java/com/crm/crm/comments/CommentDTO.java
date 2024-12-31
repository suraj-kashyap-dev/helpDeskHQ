package com.crm.crm.comments;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.*;

@Data
public class CommentDTO {
    private Long id;

    @JsonProperty("ticket_id")
    private Long ticketId;

    @JsonProperty("sender_id")
    private Long senderId;

    @JsonProperty("type")
    private String type;

    @JsonProperty("status_update")
    private JsonNode statusUpdate;

    @JsonProperty("status")
    private String status;

    @JsonProperty("content")
    private String content;

    @JsonProperty("is_internal")
    private Boolean isInternal = false;

    @JsonProperty("is_resolution")
    private Boolean isResolution = false;

    @JsonProperty("mentions")
    private String mentions;
}
