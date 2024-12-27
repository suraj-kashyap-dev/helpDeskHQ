package com.crm.crm.organizations;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface OrganizationRepository extends JpaRepository<Organization, Long> {
    public Organization findByName(String name);
    public Organization findByDomain(String domain);
    public Organization findBySubscriptionType(String subscriptionType);
    public Organization findBySettings(String settings);
    public Organization findByNameAndDomain(String name, String domain);
    public Organization findByNameAndSubscriptionType(String name, String subscriptionType);
    public Organization findByNameAndSettings(String name, String settings);
    public Organization findByDomainAndSubscriptionType(String domain, String subscriptionType);
    public Organization findByDomainAndSettings(String domain, String settings);
    public List<Organization> findAllByOrderByCreatedAtDesc();
}
