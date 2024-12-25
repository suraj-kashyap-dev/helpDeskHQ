package com.crm.crm.organizations;

import lombok.Data;

@Data
public class OrganizationDTO {
    private String name;
    private String domain;
    private String subscriptionType;
    private String settings;
}
