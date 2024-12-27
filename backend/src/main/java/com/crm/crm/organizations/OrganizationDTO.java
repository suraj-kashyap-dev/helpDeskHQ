package com.crm.crm.organizations;

import com.crm.crm.enums.SubscriptionType;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class OrganizationDTO {
    @JsonProperty("name")
    private String name;

    @JsonProperty("domain")
    private String domain;
   
    @JsonProperty("subscription_type")
    private SubscriptionType subscriptionType = SubscriptionType.FREE;

    @JsonProperty("settings")
    private String settings;
}
