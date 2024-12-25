package com.crm.crm.users;

import java.time.LocalDateTime;
import com.crm.crm.enums.UserStatus;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class UserDTO {
    private Long id;

    @JsonProperty("organization_id")
    private Long organizationId;

    @JsonProperty("email")
    private String email;

    @JsonProperty("fullName")
    private String fullName;

    @JsonProperty("password")
    private String password;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("status")
    private UserStatus status = UserStatus.ACTIVE;

    private String preferences = "{}";

    private String notificationSettings;

    private LocalDateTime lastLogin;
}
