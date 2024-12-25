package com.crm.crm.users;

import java.time.LocalDateTime;

import com.crm.crm.enums.Status;
import com.crm.crm.organizations.Organization;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private Organization organization;
    private String email;
    private String fullName;
    private String password;
    private String phone;
    private Status status;
    private String preferences;
    private String notificationSettings;
    private LocalDateTime lastLogin;
}
