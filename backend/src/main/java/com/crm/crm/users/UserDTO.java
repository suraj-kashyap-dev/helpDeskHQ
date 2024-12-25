package com.crm.crm.users;

import java.time.LocalDateTime;

import com.crm.crm.enums.UserStatus;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private Long organizationId;
    private String email;
    private String fullName;
    private String password;
    private String phone;
    private UserStatus status;
    private String preferences;
    private String notificationSettings;
    private LocalDateTime lastLogin;
}
